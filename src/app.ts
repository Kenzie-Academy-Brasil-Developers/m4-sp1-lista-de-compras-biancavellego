import express, { Application, json } from "express";

//Middlewares:
import {
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
} from "./middlewares/middlewares";

//Controllers:
import {
  createListController,
  deleteListController,
  deleteListProductController,
  getAllListsController,
  getSingleListController,
  updateListProductController,
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
  ensureProductExistsMiddleware,
  updateListProductController
);
app.delete(
  "/purchaseList/:id/<itemName>",
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  deleteListProductController
);
app.delete(
  "/purchaseList/:id",
  ensureListExistsMiddleware,
  deleteListController
);
//==============================================================SERVER==================================================================//
app.listen(3000, () => console.log("Server running in port 3000"));
