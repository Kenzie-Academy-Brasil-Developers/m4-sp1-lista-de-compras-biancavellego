import { Request, Response, NextFunction } from "express";
import { allLists } from "../database";

//============================================================MIDDLEWARES===============================================================//
export const ensureListExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const urlId = request.params.id;
  const requestedList = allLists.filter((list) => list.id === urlId);

  if (requestedList) {
    return response
      .status(404)
      .json({ message: `List with id ${urlId} does not exist` });
  }

  next();
};
