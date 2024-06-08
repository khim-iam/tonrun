


// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const App1 = () => {
//   const canvasRef = useRef(null);
//   const countdownRef = useRef(null);
//   const [selectedPowerUp, setSelectedPowerUp] = useState(null);
//   const [powerupUsed, setPowerupUsed] = useState({
//     speed: false,
//     slow: false,
//     freeze: false
//   });

//   const socket = io();

//   const devicePixelRatio = window.devicePixelRatio || 1;
//   const colorArr = ['gray', 'gray', 'gray', 'gray', 'yellow', 'yellow', 'yellow', 'green', 'green', 'cyan'];
//   const frontendPlayers = {};
//   const frontendCoins = {};
//   const frontendPowerUps = {};
//   let animationId;
//   const keys = {
//     w: { pressed: false },
//     a: { pressed: false },
//     s: { pressed: false },
//     d: { pressed: false }
//   };
//   const speed = 10;
//   const playerInputs = [];
//   let sequenceNumber = 0;

//   const initCanvas = () => {
//     const canvas = canvasRef.current;
//     const c = canvas.getContext('2d');
//     canvas.width = window.innerWidth * devicePixelRatio;
//     canvas.height = window.innerHeight * devicePixelRatio;
//     return c;
//   };

//   const animate = (c) => {
//     animationId = requestAnimationFrame(() => animate(c));
//     c.fillStyle = 'rgba(0, 0, 0, 0.1)';
//     c.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     for (const id in frontendPlayers) {
//       frontendPlayers[id].draw();
//     }

//     for (const id in frontendCoins) {
//       frontendCoins[id].draw();
//     }

//     for (const id in frontendPowerUps) {
//       frontendPowerUps[id].draw();
//     }
//   };

//   useEffect(() => {
//     const c = initCanvas();

//     socket.on('countdown', (countdown) => {
//       const countdownElement = countdownRef.current;
//       if (countdown === 'Go!') {
//         countdownElement.innerText = countdown;
//         setTimeout(() => {
//           countdownElement.innerText = '';
//         }, 1000);
//       } else if (countdown === 'Stop!') {
//         countdownElement.innerText = countdown;
//         setTimeout(() => {
//           countdownElement.innerText = '';
//           document.querySelector('#endpop').style.display = 'block';
//         }, 1000);
//       } else {
//         countdownElement.innerText = countdown;
//       }
//     });

//     socket.on('connect', async () => {
//       const selectLeague = async () => {
//         return new Promise((resolve) => {
//           let league = null;
//           while (!league || !['1', '2', '3'].includes(league)) {
//             league = prompt('Enter league (1, 2, or 3):');
//           }
//           resolve(league);
//         });
//       };

//       const league = await selectLeague();
//       socket.emit('selectLeague', league);

//       socket.emit('initcanvas', {
//         width: canvasRef.current.width,
//         height: canvasRef.current.height,
//         devicePixelRatio
//       });
//     });

//     socket.on('updatePowerUps', (backendPowerUps) => {
//       for (const id in backendPowerUps) {
//         const powerUp = backendPowerUps[id];
//         if (!frontendPowerUps[id]) {
//           frontendPowerUps[id] = new Powerup({
//             x: powerUp.x,
//             y: powerUp.y,
//             radius: 20,
//             type: powerUp.type
//           });
//         }
//       }
//       for (const id in frontendPowerUps) {
//         if (!backendPowerUps[id]) {
//           delete frontendPowerUps[id];
//         }
//       }
//     });

//     socket.on('updateCoins', (backendCoins) => {
//       for (const id in backendCoins) {
//         const coin = backendCoins[id];
//         if (!frontendCoins[id]) {
//           frontendCoins[id] = new Coin({
//             x: coin.x,
//             y: coin.y,
//             radius: 15,
//             color: colorArr[coin.colornum % 10]
//           });
//         }
//       }
//       for (const id in frontendCoins) {
//         if (!backendCoins[id]) {
//           delete frontendCoins[id];
//         }
//       }
//     });

//     socket.on('updatePlayers', (backendPlayers) => {
//       for (const id in backendPlayers) {
//         const backendPlayer = backendPlayers[id];
//         if (!frontendPlayers[id]) {
//           frontendPlayers[id] = new Player({
//             x: backendPlayer.x,
//             y: backendPlayer.y,
//             radius: 10,
//             color: backendPlayer.color
//           });
//           document.querySelector('#playerlabels').innerHTML += `<div data-id="${id}" data-score="${backendPlayer.score}">${id} :${backendPlayer.score} </div>`;
//         } else {
//           document.querySelector(`div[data-id=${id}]`).innerHTML = `${id} :${backendPlayer.score}`;
//           if (id === socket.id) {
//             frontendPlayers[id].x = backendPlayer.x;
//             frontendPlayers[id].y = backendPlayer.y;

//             const lastBackendInputIndex = playerInputs.findIndex((input) => backendPlayer.sequencenumber === input.sequencenumber);

//             if (lastBackendInputIndex > -1) {
//               playerInputs.splice(0, lastBackendInputIndex + 1);
//             }

//             playerInputs.forEach((input) => {
//               frontendPlayers[id].x += input.dx;
//               frontendPlayers[id].y += input.dy;
//             });
//           } else {
//             frontendPlayers[id].x = backendPlayer.x;
//             frontendPlayers[id].y = backendPlayer.y;

//             gsap.to(frontendPlayers[id], {
//               x: backendPlayer.x,
//               y: backendPlayer.y,
//               duration: 0.015,
//               ease: 'linear'
//             });
//           }
//         }
//       }

//       for (const id in frontendPlayers) {
//         if (!backendPlayers[id]) {
//           const divToDelete = document.querySelector(`div[data-id=${id}]`);
//           divToDelete.parentNode.removeChild(divToDelete);
//           delete frontendPlayers[id];
//         }
//       }
//     });

//     animate(c);

//     const handleKeyDown = (e) => {
//       if (!frontendPlayers[socket.id]) return;

//       switch (e.code) {
//         case 'KeyW':
//           keys.w.pressed = true;
//           break;
//         case 'KeyA':
//           keys.a.pressed = true;
//           break;
//         case 'KeyS':
//           keys.s.pressed = true;
//           break;
//         case 'KeyD':
//           keys.d.pressed = true;
//           break;
//         default:
//           break;
//       }
//     };

//     const handleKeyUp = (e) => {
//       if (!frontendPlayers[socket.id]) return;

//       switch (e.code) {
//         case 'KeyW':
//           keys.w.pressed = false;
//           break;
//         case 'KeyA':
//           keys.a.pressed = false;
//           break;
//         case 'KeyS':
//           keys.s.pressed = false;
//           break;
//         case 'KeyD':
//           keys.d.pressed = false;
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     const intervalId = setInterval(() => {
//       if (keys.w.pressed) {
//         sequenceNumber++;
//         playerInputs.push({ sequencenumber: sequenceNumber, dx: 0, dy: -speed });
//         frontendPlayers[socket.id].y -= speed;
//         socket.emit('keydown', { keycode: 'KeyW', sequencenumber: sequenceNumber });
//       }
//       if (keys.a.pressed) {
//         sequenceNumber++;
//         playerInputs.push({ sequencenumber: sequenceNumber, dx: -speed, dy: 0 });
//         frontendPlayers[socket.id].x -= speed;
//         socket.emit('keydown', { keycode: 'KeyA', sequencenumber: sequenceNumber });
//       }
//       if (keys.s.pressed) {
//         sequenceNumber++;
//         playerInputs.push({ sequencenumber: sequenceNumber, dx: 0, dy: speed });
//         frontendPlayers[socket.id].y += speed;
//         socket.emit('keydown', { keycode: 'KeyS', sequencenumber: sequenceNumber });
//       }
//       if (keys.d.pressed) {
//         sequenceNumber++;
//         playerInputs.push({ sequencenumber: sequenceNumber, dx: speed, dy: 0 });
//         frontendPlayers[socket.id].x += speed;
//         socket.emit('keydown', { keycode: 'KeyD', sequencenumber: sequenceNumber });
//       }
//     }, 15);

//     return () => {
//       clearInterval(intervalId);
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   const handleCanvasClick = (event) => {
//     if (selectedPowerUp) {
//       const x = event.clientX * devicePixelRatio;
//       const y = event.clientY * devicePixelRatio;
//       socket.emit('placePowerUp', { type: selectedPowerUp, x, y });
//       setSelectedPowerUp(null);
//     }
//   };

//   const handlePowerUpClick = (type) => {
//     setPowerupUsed((prev) => ({
//       ...prev,
//       [type]: !prev[type]
//     }));
//     setSelectedPowerUp((prev) => (prev === type ? null : type));
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
//       <div id="countdown" ref={countdownRef}></div>
//       <div id="playerlabels"></div>
//       <div id="endpop" style={{ display: 'none' }}>Game Over</div>
//       <div className="power-ups">
//         <button className="power-up" data-type="speed" onClick={() => handlePowerUpClick('speed')}>Speed</button>
//         <button className="power-up" data-type="slow" onClick={() => handlePowerUpClick('slow')}>Slow</button>
//         <button className="power-up" data-type="freeze" onClick={() => handlePowerUpClick('freeze')}>Freeze</button>
//       </div>
//     </div>
//   );
// };

// export default App1;
