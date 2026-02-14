import React, { useState, useEffect } from 'react';
import { socket } from './socket';

export default function App() {
  //seting up position of own cursor
  let [pos, setPos] = useState({});
  //setting the position for the other cursor
  let [cursors, setCursors] = useState({});

  //managin the mouse move event
  function handleMouseMove(e) {
    setPos({clientX:e.clientX, clientY:e.clientY});
    socket.emit("mouseChange", {id:socket.id,
      x:e.clientX,
      y:e.clientY
    }); 
  }

  //adding removing listner
  useEffect(() =>{
    window.addEventListener("mousemove", handleMouseMove);
    return () =>{
      window.removeEventListener("mousemove", handleMouseMove);
    }
  },[ ])

  //removing cursor
  useEffect(() =>{
    const handleRemove = (id) =>{
      setCursors(prev =>{
        const updated = {...prev};
        delete updated[id];
        return updated;
      })
    }
    socket.on("removeCursor", handleRemove);
    return () =>{
      socket.off("removeCursor", handleRemove);
    }
  }, [])

  //adding removing socket
  useEffect(() => {
    socket.on("mouseMove", (data) => {
      const {id, x, y} = data;
      setCursors(prev =>({
        ...prev,
        [id]:{x,y}
      }))
    });
    console.log(cursors)
  
    return () => {
      socket.off("mouseMove");
    };
  }, []);
  return (
    <div className="App">
      <div className='selfCursor'
          style={{
            position: "absolute",
            left: pos.clientX,
            top: pos.clientY,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            transition: "all ease-in-out"
          }}
        />
      {Object.entries(cursors).map(([id, position]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: "10px",
            height: "10px",
            backgroundColor: "blue",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />
      ))}

    </div>
  );
}