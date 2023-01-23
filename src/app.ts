import express, { Application, json, Request, Response } from "express";

const app: Application = express();
app.use(json());

app.listen(3000, () => console.log("Server running in port 3000"));
