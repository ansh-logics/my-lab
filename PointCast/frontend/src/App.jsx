import React, { useState, useEffect } from 'react';
import { socket } from './socket';

export default function App() {
  //seting up position of own cursor
  let [pos, setPos] = useState({});
  //setting the position for the other cursor
  let [cursors, setCursors] = useState({});

  //user name
  let [name, setName] = useState("");
  let [joined, setJoined] = useState(false)
  let [color, setColor] = useState("")
  //managin the mouse move event
  function handleMouseMove(e) {
    setPos({ clientX: e.clientX, clientY: e.clientY });
    socket.emit("mouseChange", {
      id: socket.id,
      x: e.clientX,
      y: e.clientY
    });
  }
  useEffect(() => {
    if(!joined) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [joined])

  //removing cursor
  useEffect(() => {
    if(!joined) return;
    const handleRemove = (id) => {
      setCursors(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      })
    }
    socket.on("removeCursor", handleRemove);
    return () => {
      socket.off("removeCursor", handleRemove);
    }
  }, [joined])

  //adding removing socket
  useEffect(() => {
    if (!joined) return;
    socket.on("mouseMove", (data) => {
      const { id, x, y, name, color } = data;
      console.log(data);
      setCursors(prev => ({
        ...prev,
        [id]: { x, y, name, color}
      }))
    });
    console.log(cursors)

    return () => {
      socket.off("mouseMove");
    };
  }, [joined]);
  //adding removing listner

  let handleNameChange = (e)=>{
    setName(e.target.value);
  }
  let handleColorChange = (e) =>{
    setColor(e.target.value);
  }
  let handleJoin = () =>{
    socket.emit("join", {name:name, color:color});
    setJoined(true);
  }
 return (
    <div className="App">
      {joined == true ?
        <div>
          <div className='selfCursor'
            style={{
              position: "absolute",
              left: pos.clientX,
              top: pos.clientY,
              width: "10px",
              height: "10px",
              backgroundColor: color,
              borderRadius: "50%",
              transition: "all ease-in-out"
            }}
          />
          {Object.entries(cursors).map(([id, position]) => (
            <div>
              <div
                key={id}
                style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  width: "10px",
                  height: "10px",
                  backgroundColor: position.color,
                  borderRadius: "50%",
                  pointerEvents: "none"
                }}
              />
              <label htmlFor="div"
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
              }}>{position.name}</label>
            </div>
          ))}</div>:<div>
            <input type="text" onChange={handleNameChange} placeholder='Enter you username'/>
            <input type='color' onChange={handleColorChange} />
            <button name='join' onClick={handleJoin}>Join</button>
          </div>

      }

    </div>
  );
}