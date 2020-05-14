import dotenv from "dotenv";
import { join, dirname } from "path";

dotenv.config({ path: join(dirname(__dirname), ".env") });

import express from "express";

import { articles } from "./routes/articles";
import { runJobs } from "./jobs";
import { db } from "./config/db";
import { allowCrossDomain } from "./utils/cors";
import { ErrorResponse } from "./models/response";

const server = express();
server.use(allowCrossDomain);
server.use(express.json());

db.authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("Error: " + err));

server.all("*", (req, res, next) => {
  const date = new Date();
  const timeString = `${date.toDateString()} ${date
    .toTimeString()
    .split("(")[0]
    .trim()}`;
  console.log(
    "\x1b[32m%s\x1b[0m",
    `${timeString} - ${req.method} request from: ${req.originalUrl}`
  );
  next();
});

server.get("/", (req, res) => {
  res.send("Updates on <strong>Space Exploration</strong>");
});

server.use("/api/v1/articles", articles);

server.all("*", (req, res) => {
  const response: ErrorResponse = {
    success: false,
    statusCode: 404,
    message: "Not Found",
    error: {},
  };

  res.json(response);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server listening at port: ${port}`);

  runJobs();
});
