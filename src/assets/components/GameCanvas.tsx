// // src/assets/components/GameCanvas.tsx

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import './MazeGame.css';

// const socket: Socket = io('https://localhost:3000'); // Use HTTPS

// const canvasWidth = 500;
// const canvasHeight = 500;
// const cellSize = 20; // Size of each cell

// interface Player {
//   username: string;
//   position: { x: number, y: number };
// }

// const GameCanvas: React.FC = () => {
//   const [players, setPlayers] = useState<{ [key: string]: Player }>({});
//   const navigate = useNavigate();
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     socket.on('players', (players: { [key: string]: Player }) => {
//       console.log('Players updated:', players);
//       setPlayers(players);
//     });

//     return () => {
//       socket.off('players');
//     };
//   }, []);

//   const drawCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw the players
//         for (const id in players) {
//           const player = players[id];
//           ctx.fillStyle = 'red';
//           ctx.fillRect(player.position.x * cellSize, player.position.y * cellSize, cellSize, cellSize);
//         }
//       }
//     }
//   };

//   const movePlayer = (direction: string) => {
//     if (!socket.id || !players[socket.id]) return;

//     let newX = players[socket.id].position.x;
//     let newY = players[socket.id].position.y;

//     switch (direction) {
//       case 'ArrowUp':
//         newY = Math.max(0, newY - 1);
//         break;
//       case 'ArrowDown':
//         newY = Math.min(canvasHeight / cellSize - 1, newY + 1);
//         break;
//       case 'ArrowLeft':
//         newX = Math.max(0, newX - 1);
//         break;
//       case 'ArrowRight':
//         newX = Math.min(canvasWidth / cellSize - 1, newX + 1);
//         break;
//       default:
//         break;
//     }

//     socket.emit('movePlayer', { x: newX, y: newY, room: 'public' });
//   };

//   const handleKeyDown = (e: KeyboardEvent) => {
//     e.preventDefault();
//     movePlayer(e.key);
//   };

//   useEffect(() => {
//     const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
//     window.addEventListener('keydown', keyDownHandler);

//     return () => {
//       window.removeEventListener('keydown', keyDownHandler);
//     };
//   }, []);

//   useEffect(() => {
//     drawCanvas();
//   }, [players]);

//   const endGame = () => {
//     navigate('/tonrun/');
//   };

//   return (
//     <div>
//       <h2>Public Maze Game</h2>
//       <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
//       <div className="controls">
//         <button onClick={() => movePlayer('ArrowUp')}>Up</button>
//         <div>
//           <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
//           <button onClick={() => movePlayer('ArrowRight')}>Right</button>
//         </div>
//         <div>
//           <button onClick={() => movePlayer('ArrowDown')}>Down</button>
//         </div>
//       </div>
//       <button onClick={endGame}>End Game</button>
//     </div>
//   );
// };

// export default GameCanvas;





// // src/assets/components/GameCanvas.tsx

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import './MazeGame.css';

// const socket: Socket = io('https://localhost:3000'); // Use HTTPS

// const canvasWidth = 500;
// const canvasHeight = 500;
// const cellSize = 20; // Size of each cell

// interface Player {
//   username: string;
//   position: { x: number, y: number };
// }

// const GameCanvas: React.FC = () => {
//   const [players, setPlayers] = useState<{ [key: string]: Player }>({});
//   const navigate = useNavigate();
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     socket.on('players', (players: { [key: string]: Player }) => {
//       console.log('Players updated:', players);
//       setPlayers(players);
//     });

//     return () => {
//       socket.off('players');
//     };
//   }, []);

//   const drawCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw the players
//         for (const id in players) {
//           const player = players[id];
//           ctx.fillStyle = 'red';
//           ctx.fillRect(player.position.x * cellSize, player.position.y * cellSize, cellSize, cellSize);
//         }
//       }
//     }
//   };

//   const movePlayer = (direction: string) => {
//     if (!socket.id || !players[socket.id]) return;

//     let newX = players[socket.id].position.x;
//     let newY = players[socket.id].position.y;

//     switch (direction) {
//       case 'ArrowUp':
//         newY = Math.max(0, newY - 1);
//         break;
//       case 'ArrowDown':
//         newY = Math.min(canvasHeight / cellSize - 1, newY + 1);
//         break;
//       case 'ArrowLeft':
//         newX = Math.max(0, newX - 1);
//         break;
//       case 'ArrowRight':
//         newX = Math.min(canvasWidth / cellSize - 1, newX + 1);
//         break;
//       default:
//         break;
//     }

//     socket.emit('movePlayer', { x: newX, y: newY, room: 'public' });
//   };

//   const handleKeyDown = (e: KeyboardEvent) => {
//     e.preventDefault();
//     movePlayer(e.key);
//   };

//   useEffect(() => {
//     const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
//     window.addEventListener('keydown', keyDownHandler);

//     return () => {
//       window.removeEventListener('keydown', keyDownHandler);
//     };
//   }, []);

//   useEffect(() => {
//     drawCanvas();
//   }, [players]);

//   const endGame = () => {
//     navigate('/tonrun/');
//   };

//   return (
//     <div>
//       <h2>Public Maze Game</h2>
//       <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }}></canvas>
//       <div className="controls">
//         <button onClick={() => movePlayer('ArrowUp')}>Up</button>
//         <div>
//           <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
//           <button onClick={() => movePlayer('ArrowRight')}>Right</button>
//         </div>
//         <div>
//           <button onClick={() => movePlayer('ArrowDown')}>Down</button>
//         </div>
//       </div>
//       <button onClick={endGame}>End Game</button>
//     </div>
//   );
// };

// export default GameCanvas;
// src/assets/components/GameCanvas.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './MazeGame.css';

const socket: Socket = io('https://localhost:3000'); // Use HTTPS

const canvasWidth = 500;
const canvasHeight = 500;
const cellSize = 20; // Size of each cell

interface Player {
  username: string;
  position: { x: number, y: number };
}

const GameCanvas: React.FC = () => {
  const [players, setPlayers] = useState<{ [key: string]: Player }>({});
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    socket.on('players', (players: { [key: string]: Player }) => {
      setPlayers(players);
    });

    return () => {
      socket.off('players');
    };
  }, []);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the players
        for (const id in players) {
          const player = players[id];
          ctx.fillStyle = 'red';
          ctx.fillRect(player.position.x * cellSize, player.position.y * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  const movePlayer = (direction: string) => {
    if (!socket.id || !players[socket.id]) return;

    let newX = players[socket.id].position.x;
    let newY = players[socket.id].position.y;

    switch (direction) {
      case 'ArrowUp':
        newY = Math.max(0, newY - 1);
        break;
      case 'ArrowDown':
        newY = Math.min(canvasHeight / cellSize - 1, newY + 1);
        break;
      case 'ArrowLeft':
        newX = Math.max(0, newX - 1);
        break;
      case 'ArrowRight':
        newX = Math.min(canvasWidth / cellSize - 1, newX + 1);
        break;
      default:
        break;
    }

    socket.emit('movePlayer', { x: newX, y: newY, room: 'public' });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    movePlayer(e.key);
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [players]);

  const endGame = () => {
    navigate('/tonrun/');
  };

  return (
    <div>
      <h2>Public Maze Game</h2>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }}></canvas>
      <div className="controls">
        <button onClick={() => movePlayer('ArrowUp')}>Up</button>
        <div>
          <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
          <button onClick={() => movePlayer('ArrowRight')}>Right</button>
        </div>
        <div>
          <button onClick={() => movePlayer('ArrowDown')}>Down</button>
        </div>
      </div>
      <button onClick={endGame}>End Game</button>
    </div>
  );
};

export default GameCanvas;
