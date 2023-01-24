import express, { Application, json } from "express";

//Middlewares:
import { ensureListExistsMiddleware } from "./middlewares/middlewares";

//Controllers:
import {
  createListController,
  deleteListController,
  deleteListItemController,
  getAllListsController,
  getSingleListController,
  updateListItemController,
} from "./controllers/controllers";

const app: Application = express();
app.use(json());

//=============================================================ROUTES===================================================================//
app.post("/purchaseList", createListController);
app.get("/purchaseList", getAllListsController);
app.get(
  "/purchaseList/:id",
  ensureListExistsMiddleware,
  getSingleListController
);
app.patch(
  "/purchaseList/:id/<itemName>",
  ensureListExistsMiddleware,
  updateListItemController
);
app.delete(
  "/purchaseList/:id/<itemName>",
  ensureListExistsMiddleware,
  deleteListItemController
);
app.delete(
  "/purchaseList/:id",
  ensureListExistsMiddleware,
  deleteListController
);
//==============================================================SERVER==================================================================//
app.listen(3000, () => console.log("Server running in port 3000"));
