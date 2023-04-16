const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.broadcast.emit("message", "new user found!");

  socket.emit("message", "welcome");

  socket.on("submitFormData", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", "user left !");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
