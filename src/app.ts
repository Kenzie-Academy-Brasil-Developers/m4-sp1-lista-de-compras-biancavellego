import express, { Application, json } from "express";

//Middlewares:
import {
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  ensureUuidValidityMiddleware,
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
  ensureUuidValidityMiddleware,
  ensureListExistsMiddleware,
  getSingleListController
);
app.patch(
  "/purchaseList/:id?name=",
  ensureUuidValidityMiddleware,
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  updateListProductController
);
app.delete(
  "/purchaseList/:id?name=",
  ensureUuidValidityMiddleware,
  ensureListExistsMiddleware,
  ensureProductExistsMiddleware,
  deleteListProductController
);
app.delete(
  "/purchaseList/:id",
  ensureUuidValidityMiddleware,
  ensureListExistsMiddleware,
  deleteListController
);
//==============================================================SERVER==================================================================//
app.listen(3000, () => console.log("Server running in port 3000"));
