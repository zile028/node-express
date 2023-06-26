const express = require("express");
const server = express();
const data = require("./data.json");

server.use(express.static(__dirname + "/frontend"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("OK");
});

server.post("/questions/:category", (req, res) => {
  let { category } = req.params;
  console.log(req.body);
  // let category = req.query.category;
  res.send(data.filter((question) => question.category === category));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
