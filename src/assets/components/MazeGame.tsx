import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MazeGame.css';

const mazeWidth = 10;
const mazeHeight = 10;
const cellSize = 20; // Size of each cell in the maze

const generateMaze = () => {
  const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(0));
  for (let i = 0; i < mazeHeight; i++) {
    for (let j = 0; j < mazeWidth; j++) {
      if (Math.random() > 0.7) {
        maze[i][j] = 1;
      }
    }
  }
  return maze;
};

const MazeGame: React.FC = () => {
  const [maze, setMaze] = useState<number[][]>(generateMaze());
  const [playerPosition, setPlayerPosition] = useState<{ x: number, y: number }>({ x: Math.floor(mazeWidth / 2), y: Math.floor(mazeHeight / 2) });
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMaze = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the maze
        for (let y = 0; y < mazeHeight; y++) {
          for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
              ctx.fillStyle = 'black';
            } else {
              ctx.fillStyle = 'white';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        }

        // Draw the player
        ctx.fillStyle = 'red';
        ctx.fillRect(playerPosition.x * cellSize, playerPosition.y * cellSize, cellSize, cellSize);
      }
    }
  };

  const movePlayer = (direction: string) => {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'ArrowUp':
        newY = Math.max(0, playerPosition.y - 1);
        break;
      case 'ArrowDown':
        newY = Math.min(mazeHeight - 1, playerPosition.y + 1);
        break;
      case 'ArrowLeft':
        newX = Math.max(0, playerPosition.x - 1);
        break;
      case 'ArrowRight':
        newX = Math.min(mazeWidth - 1, playerPosition.x + 1);
        break;
      default:
        break;
    }

    if (maze[newY][newX] === 0) {
      setPlayerPosition({ x: newX, y: newY });
    }
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
  }, [playerPosition, maze]);

  useEffect(() => {
    drawMaze();
  }, [playerPosition, maze]);

  const regenerateMaze = () => {
    setMaze(generateMaze());
    setPlayerPosition({ x: Math.floor(mazeWidth / 2), y: Math.floor(mazeHeight / 2) });
  };

  const endGame = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Maze Game</h2>
      <canvas ref={canvasRef} width={mazeWidth * cellSize} height={mazeHeight * cellSize}></canvas>
      <div className="controls">
        <button onClick={() => movePlayer('ArrowUp')}>Up</button>
        <div>
          <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
          <button onClick={() => movePlayer('ArrowDown')}>Down</button>
          <button onClick={() => movePlayer('ArrowRight')}>Right</button>
        </div>
      </div>
      <button onClick={regenerateMaze}>Regenerate Maze</button>
      <button onClick={endGame}>End Game</button>
    </div>
  );
};

export default MazeGame;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './MazeGame.css';

// const mazeWidth = 10;
// const mazeHeight = 10;

// const generateMaze = () => {
//   // Simple maze generation (0 = open space, 1 = wall)
//   const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(0));
//   // Add some walls
//   for (let i = 0; i < mazeHeight; i++) {
//     for (let j = 0; j < mazeWidth; j++) {
//       if (Math.random() > 0.7) {
//         maze[i][j] = 1;
//       }
//     }
//   }
//   return maze;
// };

// const MazeGame: React.FC = () => {
//   const [maze, setMaze] = useState<number[][]>(generateMaze());
//   const [playerPosition, setPlayerPosition] = useState<{ x: number, y: number }>({ x: Math.floor(mazeWidth / 2), y: Math.floor(mazeHeight / 2) });
//   const navigate = useNavigate();

//   const movePlayer = (direction: string) => {
//     let newX = playerPosition.x;
//     let newY = playerPosition.y;

//     switch (direction) {
//       case 'ArrowUp':
//         newY = Math.max(0, playerPosition.y - 1);
//         break;
//       case 'ArrowDown':
//         newY = Math.min(mazeHeight - 1, playerPosition.y + 1);
//         break;
//       case 'ArrowLeft':
//         newX = Math.max(0, playerPosition.x - 1);
//         break;
//       case 'ArrowRight':
//         newX = Math.min(mazeWidth - 1, playerPosition.x + 1);
//         break;
//       default:
//         break;
//     }

//     if (maze[newY][newX] === 0) {
//       setPlayerPosition({ x: newX, y: newY });
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent) => {
//     e.preventDefault(); // Prevent the default behavior of arrow keys
//     movePlayer(e.key);
//   };

//   useEffect(() => {
//     const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
//     window.addEventListener('keydown', keyDownHandler);
//     return () => {
//       window.removeEventListener('keydown', keyDownHandler);
//     };
//   }, [playerPosition, maze]);

//   const regenerateMaze = () => {
//     setMaze(generateMaze());
//     setPlayerPosition({ x: Math.floor(mazeWidth / 2), y: Math.floor(mazeHeight / 2) });
//   };

//   const endGame = () => {
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Maze Game</h2>
//       <div className="maze">
//         {maze.map((row, rowIndex) => (
//           <div key={rowIndex} className="maze-row">
//             {row.map((cell, cellIndex) => (
//               <div key={cellIndex} className={`maze-cell ${cell === 1 ? 'wall' : ''} ${playerPosition.x === cellIndex && playerPosition.y === rowIndex ? 'player' : ''}`}>
//                 {playerPosition.x === cellIndex && playerPosition.y === rowIndex ? 'P' : ''}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="controls">
//         <button onClick={() => movePlayer('ArrowUp')}>Up</button>
//         <div>
//           <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
//           <button onClick={() => movePlayer('ArrowDown')}>Down</button>
//           <button onClick={() => movePlayer('ArrowRight')}>Right</button>
//         </div>
//       </div>
//       <button onClick={regenerateMaze}>Regenerate Maze</button>
//       <button onClick={endGame}>End Game</button>
//     </div>
//   );
// };

// export default MazeGame;
