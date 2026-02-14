import React, { useState, useEffect } from 'react';
import { socket } from './socket';

export default function App() {
  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("hello", { message: "Hi there I am client" })
    socket.on("Hii",(data) =>{
      console.log(data.message);
    })
    socket.on("announcement",(data)=>{
      alert(`A wild guest appeared ${data.user}`);
    })
  })
  return (
    <div className="App">
      pointcast
    </div>
  );
}