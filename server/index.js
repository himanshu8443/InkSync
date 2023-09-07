const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

let initialElements = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  io.emit("updateCanvas", initialElements); // Send initial elements to the connected client
  console.log("sent initial elements", initialElements);
  socket.on("updateCanvas", (updatedElements) => {
    // Broadcast the updated elements to all connected clients
    socket.broadcast.emit("updateCanvas", updatedElements);
    initialElements = updatedElements;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
