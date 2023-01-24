import { Response } from "express";
import { IList, IProduct } from "../interfaces";
import { allLists } from "../database";
import { v4 as uuidv4 } from "uuid";
import { validateListData, validateProductData } from "../serializer";

//======================================================CREATE LIST SERVICE==============================================================//
export const createListService = (
  requestBody: IList,
  response: Response
): IList | Response => {
  try {
    const validatedListData: IList = validateListData(requestBody);
    const validatedProductData: IProduct[] = requestBody.data.map((product) =>
      validateProductData(product)
    );

    const newListName = validatedListData.listName;
    const newListArray: IProduct[] = validatedProductData;

    let newList: IList = {
      id: "",
      listName: "",
      data: [],
    };

    newList = { id: uuidv4(), listName: newListName, data: newListArray };

    allLists.push(...[newList]);

    return newList;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: "" });
    }
    console.log(error);
    return response.status(500).json({ message: error });
  }
};
//=========================================================GET ALL LISTS SERVICE=========================================================//
export const getAllListsService = (response: Response) => {
  try {
    return allLists;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: "" });
    }
    console.log(error);
    return response.status(500).json({ message: error });
  }
};
//=========================================================GET SINGLE LIST SERVICE=======================================================//
export const getSingleListService = (urlId: string, response: Response) => {
  try {
  } catch (error) {}
};
//========================================================UPDATE LIST ITEM SERVICE=======================================================//
export const updateListItemService = (
  urlId: string,
  urlQuery: string,
  response: Response
) => {
  try {
  } catch (error) {}
};
//=========================================================DELETE LIST ITEM SERVICE======================================================//
export const deleteListItemService = (
  urlId: string,
  urlQuery: string,
  response: Response
) => {
  try {
  } catch (error) {}
};
//===========================================================DELETE LIST SERVICE=========================================================//
export const deleteListService = (urlId: string, response: Response) => {
  try {
  } catch (error) {}
};
