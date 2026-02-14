import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173"
    }
});
io.on("connection", (socket) => {
    console.log("a user is connected", socket.id);
    socket.on("mouseChange", (data)=>{
        socket.broadcast.emit("mouseMove", {id:socket.id, 
            x:data.x,
            y:data.y
       });
    });
    socket.on("disconnect", ()=>{
        socket.broadcast.emit("removeCursor", socket.id);
    })
});

httpServer.listen(3000, ()=>{
    console.log("Server is running");
});