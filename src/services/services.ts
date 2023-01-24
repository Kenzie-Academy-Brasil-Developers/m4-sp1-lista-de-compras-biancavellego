import { IList, IProduct } from "../interfaces";
import { allLists } from "../database";
import { v4 as uuidv4 } from "uuid";

//=============================================================SERVICES=================================================================//
export const createListService = (requestBody: IList): IList => {
  const newListName = requestBody.listName;
  const newListArray: IProduct[] = requestBody.listArray;

  let list: IList = {
    id: "",
    listName: "",
    listArray: [],
  };

  list = { id: uuidv4(), listName: newListName, listArray: newListArray };

  allLists.push(...[list]);

  return list;
};

export const getAllListsService = () => {
  return allLists;
};

export const getSingleListService = (paramsId) => {};

export const updateListItemService = (paramsId, urlQuery) => {};

export const deleteListItemService = (paramsId, urlQuery) => {};

export const deleteListService = (paramsId) => {};
