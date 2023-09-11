const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
let dotenv = require("dotenv");
dotenv.config();

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

let rooms = [];
const Port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("a user connected");
  // Join Room
  socket.on("joinRoom", (data) => {
    console.log("joined room", data.roomId);
    socket.join(data.roomId);
    const elements = rooms.find((element) => element.roomId === data.roomId);
    if (elements) {
      // uppdate the new user with the current canvas
      io.to(socket.id).emit("updateCanvas", elements);
      elements.user = [...elements.user, socket.id];
    } else {
      rooms.push({
        roomId: data.roomId,
        updatedElements: [],
        user: [socket.id],
        canvasColor: "#121212",
      });
    }
  });
  // update the canvas
  socket.on("updateCanvas", (data) => {
    // Broadcast the updated elements to all connected clients
    socket.to(data.roomId).emit("updateCanvas", data);
    const elements = rooms.find((element) => element.roomId === data.roomId);
    if (elements) {
      elements.updatedElements = data.updatedElements;
      elements.canvasColor = data.canvasColor;
    }
  });

  // send message
  socket.on("sendMessage", (data) => {
    // Broadcast the updated elements to all connected clients
    socket.to(data.roomId).emit("getMessage", data);
    io.to(socket.id).emit("getMessage", data);
  });

  // ping server every 2 min to prevent render server from sleeping
  socket.on("pong", () => {
    setTimeout(() => {
      socket.emit("ping");
    }, 120000);
  });

  //clear elements when no one is in the room
  socket.on("disconnect", () => {
    rooms.forEach((element) => {
      element.user = element.user.filter((user) => user !== socket.id);
      if (element.user.length === 0) {
        rooms = rooms.filter((room) => room.roomId !== element.roomId);
      }
    });
    // console.log(rooms);
  });
});

server.listen(Port, () => {
  console.log(`listening on *:${Port}`);
});
