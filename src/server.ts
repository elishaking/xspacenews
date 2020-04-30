import express from "express";
import { api } from "./routes/api";

const server = express();

server.get("/", (req, res) => {
  res.send("Updates on <em>Space Exploration</em>");
});

server.use("/api", api);

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server listening at port: ${port}`));
