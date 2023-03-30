const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  console.log("socket rooms", socket.rooms);
  console.log("New client connected", socket.id);
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
  });
  socket.on("message", (data) => {
    const { message, room, socketId } = data;
    console.log("socketId", !!socketId);
    socket.to(socketId ? socketId : room).emit("newMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => "Server is running on port 4000");
