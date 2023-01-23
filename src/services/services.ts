import { IList, IProduct } from "../interfaces";
import { list, allLists } from "../database";

//=============================================================SERVICES=================================================================//
export const createListService = (
  requestBody: IList<IProduct[]>
): IList<IProduct[]> => {
  return requestBody;
};

export const getAllListsService = () => {};

export const getSingleListService = (paramsId) => {};

export const updateListItemService = (paramsId, urlQuery) => {};

export const deleteListItemService = (paramsId, urlQuery) => {};

export const deleteListService = (paramsId) => {};
