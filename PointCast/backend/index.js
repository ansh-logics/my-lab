import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin: "*"
    }
});
const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ name, color }) => {
    users[socket.id] = { name, color };
    console.log(users);
  });

  socket.on("mouseChange", ({ x, y }) => {
    const user = users[socket.id];

    socket.broadcast.emit("mouseMove", {
      id: socket.id,
      x,
      y,
      name: user.name,
      color: user.color
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    socket.broadcast.emit("removeCursor", socket.id);
  });
});

httpServer.listen(3000, ()=>{
    console.log("Server is running");
});