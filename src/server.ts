import dotenv from "dotenv";
import { join, dirname } from "path";

dotenv.config({ path: join(dirname(__dirname), ".env") });

import express from "express";

import { articles } from "./routes/articles";
import { runJobs } from "./jobs";
import { db } from "./config/db";

const server = express();

server.get("/", (req, res) => {
  res.send("Updates on <strong>Space Exploration</strong>");
});

server.use("/api/v1/articles", articles);

db.authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("Error: " + err));

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server listening at port: ${port}`);

  // runJobs();
});
