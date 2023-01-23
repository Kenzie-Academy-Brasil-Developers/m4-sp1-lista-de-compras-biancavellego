import express, { Application, json } from "express";

//Middlewares:

//Controllers:
import {
  createListController,
  deleteListController,
  deleteListItemController,
  getAllListsController,
  getSingleListController,
  updateListItemController,
} from "./logic";

const app: Application = express();
app.use(json());

//=============================================================ROUTES===================================================================//
app.post("/purchaseList", createListController);
app.get("/purchaseList", getAllListsController);
app.get("/purchaseList/:id", getSingleListController);
app.patch("/purchaseList/:id/<itemName>", updateListItemController);
app.delete("/purchaseList/:id/<itemName>", deleteListItemController);
app.delete("/purchaseList/:id", deleteListController);
//==============================================================SERVER==================================================================//
app.listen(3000, () => console.log("Server running in port 3000"));
