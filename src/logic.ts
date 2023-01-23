import express, { Request, Response } from "express";
import { IProduct } from "./interfaces";
import list from "./database";

//============================================================MIDDLEWARES===============================================================//

//=============================================================SERVICES=================================================================//
const createListService = (requestBody) => {};

const getAllListsService = () => {};

const getSingleListService = (paramsId) => {};

const updateListItemService = (paramsId, urlQuery) => {};

const deleteListItemService = (paramsId, urlQuery) => {};

const deleteListService = (paramsId) => {};
//===========================================================CONTROLLERS================================================================//
export const createListController = (
  request: Request,
  response: Response
): Response => {
  const data = createListService(request.body);
  return response.status(201).json({ data });
};

export const getAllListsController = (
  request: Request,
  response: Response
): Response => {
  const data = getAllListsService();
  return response.status(200).json({ data });
};

export const getSingleListController = (
  request: Request,
  response: Response
): Response => {
  const data = getSingleListService(request.params);
  return response.status(200).json({ data });
};

export const updateListItemController = (
  request: Request,
  response: Response
): Response => {
  const data = updateListItemService(request.params, request.query);
  return response.status(200).json({ data });
};

export const deleteListItemController = (
  request: Request,
  response: Response
): Response => {
  deleteListItemService(request.params, request.query);
  return response.status(204).json({});
};

export const deleteListController = (
  request: Request,
  response: Response
): Response => {
  deleteListService(request.params);
  return response.status(204).json({});
};
