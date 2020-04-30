import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Updates on <em>Space Exploration</em>");
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server listening at port: ${port}`));
