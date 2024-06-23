// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import './MazeGame.css';

// const socket = io('https://localhost:3000'); // Ensure this is HTTPS and matches your server

// const mazeWidth = 10;
// const mazeHeight = 10;
// const cellSize = 20; // Size of each cell in the maze

// const generateMaze = () => {
//   const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(0));
//   for (let i = 0; i < mazeHeight; i++) {
//     for (let j = 0; j < mazeWidth; j++) {
//       if (Math.random() > 0.7) {
//         maze[i][j] = 1;
//       }
//     }
//   }
//   return maze;
// };

// const PublicMazeGame: React.FC = () => {
//   const [maze, setMaze] = useState<number[][]>(generateMaze());
//   const [players, setPlayers] = useState<{ [key: string]: { username: string, ready: boolean, position: { x: number, y: number } } }>({});
//   const [username, setUsername] = useState('');
//   const [isReady, setIsReady] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false);
//   const navigate = useNavigate();
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     socket.on('players', (players) => {
//       setPlayers(players);
//     });

//     socket.on('startGame', () => {
//       setGameStarted(true);
//     });

//     return () => {
//       socket.off('players');
//       socket.off('startGame');
//     };
//   }, []);

//   const joinLobby = () => {
//     if (username.trim() === '') {
//       alert('Please enter a username');
//       return;
//     }
//     socket.emit('joinLobby', { username, room: 'public' });
//   };

//   const toggleReady = () => {
//     setIsReady(!isReady);
//     socket.emit('setReady', { ready: !isReady, room: 'public' });
//   };

//   const drawMaze = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw the maze
//         for (let y = 0; y < mazeHeight; y++) {
//           for (let x = 0; x < mazeWidth; x++) {
//             if (maze[y][x] === 1) {
//               ctx.fillStyle = 'black';
//             } else {
//               ctx.fillStyle = 'white';
//             }
//             ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//             ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
//           }
//         }

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
//         newY = Math.min(mazeHeight - 1, newY + 1);
//         break;
//       case 'ArrowLeft':
//         newX = Math.max(0, newX - 1);
//         break;
//       case 'ArrowRight':
//         newX = Math.min(mazeWidth - 1, newX + 1);
//         break;
//       default:
//         break;
//     }

//     if (maze[newY][newX] === 0) {
//       socket.emit('movePlayer', { x: newX, y: newY, room: 'public' });
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent) => {
//     e.preventDefault();
//     movePlayer(e.key);
//   };

//   useEffect(() => {
//     if (gameStarted) {
//       const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
//       window.addEventListener('keydown', keyDownHandler);

//       return () => {
//         window.removeEventListener('keydown', keyDownHandler);
//       };
//     }
//   }, [gameStarted]);

//   useEffect(() => {
//     if (gameStarted) {
//       drawMaze();
//     }
//   }, [players, maze, gameStarted]);

//   const regenerateMaze = () => {
//     setMaze(generateMaze());
//   };

//   const endGame = () => {
//     navigate('/tonrun/');
//   };

//   return (
//     <div>
//       {!gameStarted ? (
//         <div className="lobby">
//           <h2>Lobby</h2>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button onClick={joinLobby}>Join Lobby</button>
//           </div>
//           <ul>
//             {Object.entries(players).map(([id, player]) => (
//               <li key={id}>{player.username} - {player.ready ? 'Ready' : 'Not Ready'}</li>
//             ))}
//           </ul>
//           <button onClick={toggleReady}>{isReady ? 'Unready' : 'Ready'}</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Public Maze Game</h2>
//           <canvas ref={canvasRef} width={mazeWidth * cellSize} height={mazeHeight * cellSize}></canvas>
//           <div className="controls">
//             <button onClick={() => movePlayer('ArrowUp')}>Up</button>
//             <div>
//               <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
//               <button onClick={() => movePlayer('ArrowRight')}>Right</button>
//             </div>
//             <div>
//               <button onClick={() => movePlayer('ArrowDown')}>Down</button>
//             </div>
//           </div>
//           <button onClick={regenerateMaze}>Regenerate Maze</button>
//           <button onClick={endGame}>End Game</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicMazeGame;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { io } from 'socket.io-client';
// // import './MazeGame.css';

// // const socket = io('https://localhost:3000'); // Ensure this is HTTPS and matches your server

// // const mazeWidth = 10;
// // const mazeHeight = 10;
// // const cellSize = 20; // Size of each cell in the maze

// // const generateMaze = () => {
// //   const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(0));
// //   for (let i = 0; i < mazeHeight; i++) {
// //     for (let j = 0; j < mazeWidth; j++) {
// //       if (Math.random() > 0.7) {
// //         maze[i][j] = 1;
// //       }
// //     }
// //   }
// //   return maze;
// // };

// // const MazeGame: React.FC = () => {
// //   const [maze, setMaze] = useState<number[][]>(generateMaze());
// //   const [players, setPlayers] = useState<{ [key: string]: { username: string, position: { x: number, y: number } } }>({});
// //   const navigate = useNavigate();
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   const drawMaze = () => {
// //     const canvas = canvasRef.current;
// //     if (canvas) {
// //       const ctx = canvas.getContext('2d');
// //       if (ctx) {
// //         ctx.clearRect(0, 0, canvas.width, canvas.height);

// //         // Draw the maze
// //         for (let y = 0; y < mazeHeight; y++) {
// //           for (let x = 0; x < mazeWidth; x++) {
// //             if (maze[y][x] === 1) {
// //               ctx.fillStyle = 'black';
// //             } else {
// //               ctx.fillStyle = 'white';
// //             }
// //             ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
// //             ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
// //           }
// //         }

// //         // Draw the players
// //         for (const id in players) {
// //           const player = players[id];
// //           ctx.fillStyle = 'red';
// //           ctx.fillRect(player.position.x * cellSize, player.position.y * cellSize, cellSize, cellSize);
// //         }
// //       }
// //     }
// //   };

// //   const movePlayer = (direction: string) => {
// //     let newX = players[socket.id].position.x;
// //     let newY = players[socket.id].position.y;

// //     switch (direction) {
// //       case 'ArrowUp':
// //         newY = Math.max(0, newY - 1);
// //         break;
// //       case 'ArrowDown':
// //         newY = Math.min(mazeHeight - 1, newY + 1);
// //         break;
// //       case 'ArrowLeft':
// //         newX = Math.max(0, newX - 1);
// //         break;
// //       case 'ArrowRight':
// //         newX = Math.min(mazeWidth - 1, newX + 1);
// //         break;
// //       default:
// //         break;
// //     }

// //     if (maze[newY][newX] === 0) {
// //       socket.emit('movePlayer', { x: newX, y: newY });
// //     }
// //   };

// //   const handleKeyDown = (e: KeyboardEvent) => {
// //     e.preventDefault();
// //     movePlayer(e.key);
// //   };

// //   useEffect(() => {
// //     socket.on('players', (players) => {
// //       setPlayers(players);
// //     });

// //     const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
// //     window.addEventListener('keydown', keyDownHandler);

// //     return () => {
// //       socket.off('players');
// //       window.removeEventListener('keydown', keyDownHandler);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     drawMaze();
// //   }, [players, maze]);

// //   const regenerateMaze = () => {
// //     setMaze(generateMaze());
// //   };

// //   const endGame = () => {
// //     navigate('/tonrun/');
// //   };

// //   return (
// //     <div>
// //       <h2>Maze Game</h2>
// //       <canvas ref={canvasRef} width={mazeWidth * cellSize} height={mazeHeight * cellSize}></canvas>
// //       <div className="controls">
// //         <button onClick={() => movePlayer('ArrowUp')}>Up</button>
// //         <div>
// //           <button onClick={() => movePlayer('ArrowLeft')}>Left</button>
// //           <button onClick={() => movePlayer('ArrowRight')}>Right</button>
// //         </div>
// //         <div>
// //           <button onClick={() => movePlayer('ArrowDown')}>Down</button>
// //         </div>
// //       </div>
// //       <button onClick={regenerateMaze}>Regenerate Maze</button>
// //       <button onClick={endGame}>End Game</button>
// //     </div>
// //   );
// // };

// // export default MazeGame;
