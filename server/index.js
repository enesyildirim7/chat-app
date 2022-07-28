const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(port, () => {
  console.log("Server şu portta çalışıyor: ", port);
});
