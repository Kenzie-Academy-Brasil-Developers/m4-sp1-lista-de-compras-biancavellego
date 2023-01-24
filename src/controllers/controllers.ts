import { Request, Response } from "express";

//Services:
import {
  createListService,
  deleteListItemService,
  deleteListService,
  getAllListsService,
  getSingleListService,
  updateListItemService,
} from "../services/services";

//===========================================================CONTROLLERS================================================================//
export const createListController = (
  request: Request,
  response: Response
): Response => {
  const data = createListService(request.body, response);
  return response.status(201).json({ data });
};

export const getAllListsController = (
  request: Request,
  response: Response
): Response => {
  const data = getAllListsService(response);
  return response.status(200).json({ data });
};

export const getSingleListController = (
  request: Request,
  response: Response
): Response => {
  const data = getSingleListService(request.params.id, response);
  return response.status(200).json({ data });
};

export const updateListItemController = (
  request: Request,
  response: Response
): Response => {
  const data = updateListItemService(
    request.params.id,
    request.query,
    response
  );
  return response.status(200).json({ data });
};

export const deleteListItemController = (
  request: Request,
  response: Response
): Response => {
  deleteListItemService(request.params.id, request.query, response);
  return response.status(204).json({});
};

export const deleteListController = (
  request: Request,
  response: Response
): Response => {
  deleteListService(request.params.id, response);
  return response.status(204).json({});
};
