import React, { useRef, useEffect, useState } from "react";
import Player from "./Player";
const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Create a new player and add it to the state
    const newPlayers = [
      new Player({ x: 50, y: 50, radius: 5, color: "red", num: 0 }),
      new Player({ x: 150, y: 50, radius: 5, color: "blue", num: 1 }),
      new Player({ x: 250, y: 50, radius: 5, color: "green", num: 2 }),
    ];
    setPlayers(newPlayers);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      players.forEach((player) => player.draw(context));
      requestAnimationFrame(render);
    };

    render();
  }, [players]);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>;
};

export default GameCanvas;
