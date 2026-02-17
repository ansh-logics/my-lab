import './App.css'

function App() {
  function draw(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
  }
  return (
    <>
      <canvas id="canvas" width="150" height="150"></canvas>
    </>
  )
}

export default App
