import { response } from "express";
import {
  IList,
  IProduct,
  productRequiredFields,
  listRequiredFields,
} from "./interfaces";

const validateListData = (payload: any): IList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: listRequiredFields[] = ["listName", "data"];

  if (requiredKeys.length > 2) {
    response.status(400).json({ message: "Exceeded maximum number of keys" });
  }

  if (typeof requiredKeys[0] !== "string") {
    response
      .status(400)
      .json({ message: "The list name needs to be a string" });
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    response
      .status(400)
      .json({ message: `Updatable fields are: ${key1} and ${key2}` });
  }

  return payload;
};

const validateProductData = (payload: any): IProduct => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: productRequiredFields[] = ["name", "quantity"];

  if (requiredKeys.length > 2) {
    response.status(400).json({ message: "Exceeded maximum number of keys" });
  }

  if (
    typeof requiredKeys[0] !== "string" ||
    typeof requiredKeys[1] !== "string"
  ) {
    response.status(400).json({
      message: "The product's field names data type need to be string",
    });
  }

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  if (hasRequiredKeys === false) {
    const key1: string = requiredKeys[0];
    const key2: string = requiredKeys[1];

    response
      .status(400)
      .json({ message: `Updatable fields are: ${key1} and ${key2}` });
  }

  return payload;
};

export { validateListData, validateProductData };
