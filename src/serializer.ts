import {
  IList,
  IProduct,
  productRequiredFields,
  listRequiredFields,
} from "./interfaces";

const validateListData = (payload: any): IList => {};

const validateProductData = (payload: any): IProduct => {};

export { validateListData, validateProductData };

// {
//     "message": "Updatable fields are: \"name\" and \"quantity\""
// }

// {
//     "message": "The list name need to be a string"
// }
