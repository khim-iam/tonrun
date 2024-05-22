// import React, { useState, useEffect } from 'react';
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

//   const handleKeyDown = (e: KeyboardEvent) => {
//     e.preventDefault(); // Prevent the default behavior of arrow keys
//     let newX = playerPosition.x;
//     let newY = playerPosition.y;

//     switch (e.key) {
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
//       <button onClick={regenerateMaze}>Regenerate Maze</button>
//       <button onClick={() => alert('Game Ended')}>End Game</button>
//     </div>
//   );
// };

// export default MazeGame;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MazeGame.css';

const mazeWidth = 10;
const mazeHeight = 10;

const generateMaze = () => {
  // Simple maze generation (0 = open space, 1 = wall)
  const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(0));
  // Add some walls
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

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // Prevent the default behavior of arrow keys
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (e.key) {
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

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
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
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`maze-cell ${cell === 1 ? 'wall' : ''} ${playerPosition.x === cellIndex && playerPosition.y === rowIndex ? 'player' : ''}`}>
                {playerPosition.x === cellIndex && playerPosition.y === rowIndex ? 'P' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={regenerateMaze}>Regenerate Maze</button>
      <button onClick={endGame}>End Game</button>
    </div>
  );
};

export default MazeGame;
