const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.broadcast.emit("message", generateMessage("new user found!"));

  socket.emit("message", generateMessage("welcome!"));

  socket.on("submitFormData", (msg) => {
    io.emit("message", generateMessage(msg));
  });

  socket.on("sendLocation", (loc) => {
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${loc.lat},${loc.long}`
      )
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("user left !"));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
