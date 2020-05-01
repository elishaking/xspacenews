import express from "express";
import { api } from "./routes/api";
import { runJobs } from "./jobs";
// import { Intervals } from "./data/intervals";

const server = express();

server.get("/", (req, res) => {
  res.send("Updates on <strong>Space Exploration</strong>");
});

server.use("/api", api);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server listening at port: ${port}`);

  // setInterval(runJobs, Intervals.DAY);
  runJobs();
});
