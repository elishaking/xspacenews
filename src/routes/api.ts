import { Router } from "express";

export const api = Router();

api.route("/").get((req, res) => {
  res.send("API");
});
