import { Request, Response, NextFunction } from "express";
import { allLists } from "../database";

//============================================================ENSURE LIST EXISTS MIDDLEWARE==============================================//
export const ensureListExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const urlId = request.params.id;
  const requestedList = allLists.filter((list) => list.id === urlId);

  if (requestedList[0]) {
    return response
      .status(404)
      .json({ message: `List with id ${urlId} does not exist` });
  }

  next();
};
//===========================================================ENSURE PRDDUCT EXISTS MIDDLEWARE============================================//
export const ensureProductExistsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const urlId = request.params.id;
  const urlQuery = request.query.name;
  const requestedList = allLists.filter((list) => list.id === urlId);
  const requestedProduct = requestedList[0].data.filter(
    (product) => product.name === urlQuery
  );

  if (requestedProduct[0]) {
    return response
      .status(404)
      .json({ message: `Product with name ${urlQuery} does not exist` });
  }

  next();
};
