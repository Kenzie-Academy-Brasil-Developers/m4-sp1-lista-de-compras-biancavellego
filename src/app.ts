import express, { Application, json } from "express";

//Middlewares:
import {
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  ensureIdIsValidMiddleware,
} from "./logic";

//Controllers:
import {
  createListController,
  deleteListController,
  deleteListProductController,
  getAllListsController,
  getSingleListController,
  updateListProductController,
} from "./logic";

const app: Application = express();
app.use(json());

//=============================================================ROUTES===================================================================//
app.post("/purchaseList", createListController);
app.get("/purchaseList", getAllListsController);
app.get(
  "/purchaseList/:id",
  ensureIdIsValidMiddleware,
  ensureListExistsMiddleware,
  getSingleListController
);
app.patch(
  "/purchaseList/:id/:name",
  ensureIdIsValidMiddleware,
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  updateListProductController
);
app.delete(
  "/purchaseList/:id/:name",
  ensureIdIsValidMiddleware,
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  deleteListProductController
);
app.delete(
  "/purchaseList/:id",
  ensureIdIsValidMiddleware,
  ensureListExistsMiddleware,
  deleteListController
);
//==============================================================SERVER==================================================================//
app.listen(3000, () => console.log("Server running in port 3000"));
