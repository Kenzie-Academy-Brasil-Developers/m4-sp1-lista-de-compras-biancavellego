import { Request, Response } from "express";

//Services:
import {
  createListService,
  deleteListProductService,
  deleteListService,
  getAllListsService,
  getSingleListService,
  updateListProductService,
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

export const updateListProductController = (
  request: Request,
  response: Response
): Response => {
  const data = updateListProductService(
    request.body,
    request.params.id,
    request.query.name,
    response
  );
  return response.status(200).json({ data });
};

export const deleteListProductController = (
  request: Request,
  response: Response
): Response => {
  deleteListProductService(request.params.id, request.query.name, response);
  return response.status(204).json({});
};

export const deleteListController = (
  request: Request,
  response: Response
): Response => {
  deleteListService(request.params.id, response);
  return response.status(204).json([]);
};
