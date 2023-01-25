import {
  IList,
  IProduct,
  productRequiredFields,
  listRequiredFields,
} from "./interfaces";

//============================================================VALIDATE LIST DATA=======================================================//
const validateListData = (payload: any): IList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: listRequiredFields[] = ["listName", "data"];

  if (requiredKeys.length > 2) {
    throw new Error("Exceeded maximum number of keys");
  }

  if (typeof requiredKeys[0] !== "string") {
    throw new Error("The list name needs to be a string");
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    throw new Error(`Updatable fields are: ${key1} and ${key2}`);
  }

  return payload;
};

//==========================================================VALIDATE PRODUCT DATA=======================================================//
const validateProductData = (payload: any): IProduct => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: productRequiredFields[] = ["name", "quantity"];

  if (requiredKeys.length > 2) {
    throw new Error("Exceeded maximum number of keys");
  }

  if (
    typeof requiredKeys[0] !== "string" ||
    typeof requiredKeys[1] !== "string"
  ) {
    throw new Error("The product's field names data type need to be string");
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    throw new Error(`Updatable fields are: ${key1} and ${key2}`);
  }

  return payload;
};

export { validateListData, validateProductData };
