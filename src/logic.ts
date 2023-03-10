import { Request, Response, NextFunction } from "express";
import { allLists } from "./database";

//Interfaces:
import {
  IList,
  IProduct,
  productRequiredFields,
  listRequiredFields,
  IProductUpdate,
} from "./interfaces";

//======================================================================================================================================//
//===========================================================MIDDLEWARES================================================================//
//======================================================================================================================================//

//====================================================ENSURE LIST EXISTS MIDDLEWARE=====================================================//
export const ensureListExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const urlId = Number(request.params.id);
  const requestedList = allLists.filter((list) => list.id === urlId);

  if (!requestedList[0]) {
    return response
      .status(404)
      .json({ message: `List with id ${urlId} does not exist` });
  }

  next();
};
//===================================================ENSURE PRDDUCT EXISTS MIDDLEWARE===================================================//
export const ensureProductExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const urlId = Number(request.params.id);
  const urlName = request.params.name;
  const requestedList = allLists.filter((list) => list.id === urlId);
  const requestedProduct = requestedList[0].data.filter(
    (product) => product.name === urlName
  );

  if (!requestedProduct[0]) {
    return response
      .status(404)
      .json({ message: `Item with name ${urlName} does not exist` });
  }

  next();
};
//===================================================ENSURE UUID VALIDITY MIDDLEWARE=====================================================//
export const ensureIdIsValidMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ulrUuid = request.params.id;
  const uuidRegexPattern = /[1-9][0-9]*/;

  if (!uuidRegexPattern.test(ulrUuid)) {
    response.status(400).json({ message: "invalid uuid" });
  }
  return next();
};

//======================================================================================================================================//
//=============================================================SERVICES=================================================================//
//======================================================================================================================================//

//======================================================CREATE LIST SERVICE==============================================================//
const createListService = (requestBody: IList) => {
  try {
    const validatedListData: IList = validateListData(requestBody);
    const validatedProductData: IProduct[] = requestBody.data.map((product) =>
      validateProductData(product)
    );

    const newListName = validatedListData.listName;
    const newListArray: IProduct[] = validatedProductData;

    const productNames = newListArray.map((product) => product.name);

    let result = false;
    for (let i = 0; i < productNames.length; i++) {
      for (let j = 0; j < productNames.length; j++) {
        if (i !== j) {
          if (productNames[i] === productNames[j]) {
            result = true;
            break;
          }
        }
      }
    }

    if (result === true) {
      return [409, { message: "Product name already exists." }];
    }

    let newList: IList = {
      listName: "",
      data: [],
      id: 0,
    };

    let listId = allLists.length + 1;

    const idAlreadyExists = allLists.find((list) => list.id === listId);

    if (idAlreadyExists) {
      listId = idAlreadyExists.id + 1;
    }

    newList = { id: listId, listName: newListName, data: newListArray };

    allLists.push(...[newList]);

    return [201, newList];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};
//=========================================================GET ALL LISTS SERVICE=========================================================//
const getAllListsService = () => {
  try {
    return [200, allLists];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};
//=========================================================GET SINGLE LIST SERVICE=======================================================//
const getSingleListService = (urlId: number) => {
  try {
    const requestedList = allLists.filter((list) => list.id === urlId);

    return [200, requestedList[0]];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};
//========================================================UPDATE LIST ITEM SERVICE=======================================================//
const updateListProductService = (
  requestBody: IProductUpdate,
  urlId: number,
  urlName: string
) => {
  try {
    const validatedProduct: IProduct = validateProductData(requestBody);

    const requestedList = allLists.filter((list) => list.id === urlId);
    const productToBeUpdated = requestedList[0]!.data.filter(
      (product) => product.name === urlName
    );

    const newName = (productToBeUpdated[0].name = validatedProduct.name);
    const newQuantity = (productToBeUpdated[0].quantity =
      validatedProduct.quantity);

    const updatedProduct = {
      name: newName,
      quantity: newQuantity,
    };

    return [200, updatedProduct];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};
//=========================================================DELETE LIST PRODUCT SERVICE==================================================//
const deleteListProductService = (urlId: number, urlName: string) => {
  try {
    const requestedList = allLists.filter((list) => list.id === urlId);
    const productToBeDeleted = requestedList[0].data.findIndex(
      (product) => product.name === urlName
    );

    //At position "productToBeDeleted" (i.e. the index from product in the requested list), remove 1 element:
    requestedList[0].data.splice(productToBeDeleted, 1);

    return [204, {}];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};
//===========================================================DELETE LIST SERVICE========================================================//
const deleteListService = (urlId: number) => {
  try {
    const requestedListIndex = allLists.findIndex((list) => list.id === urlId);
    allLists.splice(requestedListIndex, 1);

    return [204, []];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [400, { message: error.message }];
    }
    console.log(error);
    return [500, { message: error }];
  }
};

//======================================================================================================================================//
//===========================================================CONTROLLERS================================================================//
//======================================================================================================================================//
export const createListController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = createListService(request.body);
  return response.status(status).json(data);
};

export const getAllListsController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = getAllListsService();
  return response.status(status).json(data);
};

export const getSingleListController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = getSingleListService(Number(request.params.id));
  return response.status(status).json(data);
};

export const updateListProductController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = updateListProductService(
    request.body,
    Number(request.params.id),
    request.params.name
  );
  return response.status(status).json(data);
};

export const deleteListProductController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = deleteListProductService(
    Number(request.params.id),
    request.params.name
  );
  return response.status(status).json(data);
};

export const deleteListController = (
  request: Request,
  response: Response
): Response => {
  const [status, data]: any = deleteListService(Number(request.params.id));
  return response.status(status).json(data);
};

//======================================================================================================================================//
//===========================================================SERIALIZERS================================================================//
//======================================================================================================================================//

//========================================================VALIDATE LIST DATA============================================================//
const validateListData = (payload: any): IList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: listRequiredFields[] = ["listName", "data"];

  if (payloadKeys.length > 2) {
    throw new Error("Exceeded maximum number of keys");
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    throw new Error(`Updatable fields are: ${key1} and ${key2}`);
  }

  if (
    typeof payload.listName !== "string" ||
    typeof payload.data !== "object"
  ) {
    throw new Error("The list name needs to be a string");
  }
  return payload;
};

//======================================================VALIDATE PRODUCT DATA=======================================================//
const validateProductData = (payload: any): IProduct => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: productRequiredFields[] = ["name", "quantity"];

  if (payloadKeys.length > 2) {
    throw new Error("Exceeded maximum number of keys");
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    throw new Error(`Updatable fields are: ${key1} and ${key2}`);
  }

  if (
    typeof payload.name !== "string" ||
    typeof payload.quantity !== "string"
  ) {
    throw new Error("The product's field names data type need to be string");
  }

  return payload;
};
