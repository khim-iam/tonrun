// // import React, { useRef, useEffect } from 'react';
// // import { io } from 'socket.io-client';
// // import { Coin } from './Coin';
// // import { Player } from './Player';
// // import { Powerup } from './Powerup';
// // type PowerUpType = 'speed' | 'slow' | 'freeze';

// // const GameCanvas: React.FC = () => {
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const socketRef = useRef<any>(null);
// //   const frontendplayers: { [key: string]: Player } = {};
// //   const frontendcoins: { [key: string]: Coin } = {};
// //   const frontendpowerups: { [key: string]: Powerup } = {};
// //   const powerupused: Record<PowerUpType, boolean> = { speed: false, slow: false, freeze: false };
// //   let selectedPowerUp: PowerUpType | null = null;

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const c = canvas?.getContext('2d');
// //     if (!canvas || !c) return;

// //     const devicePixelRatio = window.devicePixelRatio || 1;
// //     canvas.width = window.innerWidth * devicePixelRatio;
// //     canvas.height = window.innerHeight * devicePixelRatio;

// //     socketRef.current = io();
// //     const socket = socketRef.current;

// //     const x = canvas.width / 2;
// //     const y = canvas.height / 2;

// //     const animate = () => {
// //       c.fillStyle = 'rgba(0, 0, 0, 0.1)';
// //       c.fillRect(0, 0, canvas.width, canvas.height);

// //       for (const id in frontendplayers) {
// //         frontendplayers[id].draw(c);
// //       }

// //       for (const id in frontendcoins) {
// //         frontendcoins[id].draw(c);
// //       }

// //       for (const id in frontendpowerups) {
// //         frontendpowerups[id].draw(c);
// //       }

// //       requestAnimationFrame(animate);
// //     };
// //     animate();

// //     socket.on('countdown', (countdown: string) => {
// //       const countdownElement = document.getElementById('countdown');
// //       if (countdownElement) {
// //         countdownElement.innerText = countdown;
// //         if (countdown === 'Go!') {
// //           setTimeout(() => {
// //             countdownElement.innerText = '';
// //           }, 1000);
// //         } else if (countdown === 'Stop!') {
// //           setTimeout(() => {
// //             countdownElement.innerText = '';
// //             document.querySelector('#endpop')!.style.display = 'block';
// //           }, 1000);
// //         }
// //       }
// //     });

// //     document.querySelectorAll('.power-up').forEach(button => {
// //       button.addEventListener('click', () => {
// //         const type = button.getAttribute('data-type') as PowerUpType;
// //         if (powerupused[type]) {
// //           selectedPowerUp = null;
// //           powerupused[type] = false;
// //         } else {
// //           selectedPowerUp = type;
// //           powerupused[type] = true;
// //         }
// //       });
// //     });

// //     canvas.addEventListener('click', event => {
// //       if (selectedPowerUp) {
// //         const x = event.clientX * devicePixelRatio;
// //         const y = event.clientY * devicePixelRatio;
// //         socket.emit('placePowerUp', { type: selectedPowerUp, x, y });
// //         selectedPowerUp = null;
// //       }
// //     });

// //     socket.on('updatePowerUps', (backendpowerups: any) => {
// //       for (const id in backendpowerups) {
// //         const powerup = backendpowerups[id];
// //         if (!frontendpowerups[id]) {
// //           frontendpowerups[id] = new Powerup({
// //             x: powerup.x,
// //             y: powerup.y,
// //             radius: 20,
// //             type: powerup.type,
// //           });
// //         }
// //       }
// //       for (const id in frontendpowerups) {
// //         if (!backendpowerups[id]) {
// //           delete frontendpowerups[id];
// //         }
// //       }
// //     });

// //     socket.on('updateCoins', (backendcoins: any) => {
// //       for (const id in backendcoins) {
// //         const coin = backendcoins[id];
// //         if (!frontendcoins[id]) {
// //           frontendcoins[id] = new Coin({
// //             x: coin.x,
// //             y: coin.y,
// //             radius: 15,
// //             color: 'gray', // Set color based on your logic
// //           });
// //         }
// //       }
// //       for (const id in frontendcoins) {
// //         if (!backendcoins[id]) {
// //           delete frontendcoins[id];
// //         }
// //       }
// //     });

// //     socket.on('updatePlayers', (backendplayers: any) => {
// //       for (const id in backendplayers) {
// //         const backendplayer = backendplayers[id];
// //         if (!frontendplayers[id]) {
// //           frontendplayers[id] = new Player({
// //             x: backendplayer.x,
// //             y: backendplayer.y,
// //             radius: 10,
// //             color: backendplayer.color,
// //           });
// //           document.querySelector('#playerlabels')!.innerHTML += `<div data-id="${id}" data-score="${backendplayer.score}">${id} :${backendplayer.score} </div>`;
// //         } else {
// //           document.querySelector(`div[data-id=${id}]`)!.innerHTML = `${id} :${backendplayer.score}`;
// //           frontendplayers[id].x = backendplayer.x;
// //           frontendplayers[id].y = backendplayer.y;
// //         }
// //       }
// //       for (const id in frontendplayers) {
// //         if (!backendplayers[id]) {
// //           const divtodelete = document.querySelector(`div[data-id=${id}]`);
// //           divtodelete!.parentNode!.removeChild(divtodelete!);
// //           delete frontendplayers[id];
// //         }
// //       }
// //     });

// //     const keys = { w: { pressed: false }, a: { pressed: false }, s: { pressed: false }, d: { pressed: false } };
// //     const speed = 10;
// //     const playerinputs: { sequencenumber: number; dx: number; dy: number }[] = [];
// //     let sequencenumber = 0;

// //     setInterval(() => {
// //       if (keys.w.pressed) {
// //         sequencenumber++;
// //         playerinputs.push({ sequencenumber, dx: 0, dy: -speed });
// //         frontendplayers[socket.id].y -= speed;
// //         socket.emit('keydown', { keycode: 'KeyW', sequencenumber });
// //       }
// //       if (keys.a.pressed) {
// //         sequencenumber++;
// //         playerinputs.push({ sequencenumber, dx: -speed, dy: 0 });
// //         frontendplayers[socket.id].x -= speed;
// //         socket.emit('keydown', { keycode: 'KeyA', sequencenumber });
// //       }
// //       if (keys.s.pressed) {
// //         sequencenumber++;
// //         playerinputs.push({ sequencenumber, dx: 0, dy: speed });
// //         frontendplayers[socket.id].y += speed;
// //         socket.emit('keydown', { keycode: 'KeyS', sequencenumber });
// //       }
// //       if (keys.d.pressed) {
// //         sequencenumber++;
// //         playerinputs.push({ sequencenumber, dx: speed, dy: 0 });
// //         frontendplayers[socket.id].x += speed;
// //         socket.emit('keydown', { keycode: 'KeyD', sequencenumber });
// //       }
// //     }, 15);

// //     window.addEventListener('keydown', e => {
// //       if (!frontendplayers[socket.id]) return;
// //       switch (e.code) {
// //         case 'KeyW':
// //           keys.w.pressed = true;
// //           break;
// //         case 'KeyA':
// //           keys.a.pressed = true;
// //           break;
// //         case 'KeyS':
// //           keys.s.pressed = true;
// //           break;
// //         case 'KeyD':
// //           keys.d.pressed = true;
// //           break;
// //       }
// //     });

// //     window.addEventListener('keyup', e => {
// //       if (!frontendplayers[socket.id]) return;
// //       switch (e.code) {
// //         case 'KeyW':
// //           keys.w.pressed = false;
// //           break;
// //         case 'KeyA':
// //           keys.a.pressed = false;
// //           break;
// //         case 'KeyS':
// //           keys.s.pressed = false;
// //           break;
// //         case 'KeyD':
// //           keys.d.pressed = false;
// //           break;
// //       }
// //     });
// //   }, []);

// //   return <canvas ref={canvasRef} />;
// // };

// // export default GameCanvas;

// // import React, { useRef, useEffect } from 'react';
// // import { io } from 'socket.io-client';
// // import { Coin } from './Coin';
// // import { Player } from './Player';
// // import { Powerup } from './Powerup';





// import React, { useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { Coin } from './Coin';
// import { Player } from './Player';
// import { Powerup } from './Powerup';
// type PowerUpType = 'speed' | 'slow' | 'freeze';
// import  gsap  from 'gsap';

// const GameCanvas: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const socketRef = useRef<any>(null);
//   const frontendplayers: { [key: string]: Player } = {};
//   const frontendcoins: { [key: string]: Coin } = {};
//   const frontendpowerups: { [key: string]: Powerup } = {};
//   const powerupused: Record<PowerUpType, boolean> = { speed: false, slow: false, freeze: false };
//   let selectedPowerUp: PowerUpType | null = null;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const c = canvas?.getContext('2d');
//     if (!canvas || !c) return;

//     const devicePixelRatio = window.devicePixelRatio || 1;
//     canvas.width = window.innerWidth * devicePixelRatio;
//     canvas.height = window.innerHeight * devicePixelRatio;

//     socketRef.current = io('http://localhost:3000');
//     // socketRef.current = io();
//     const devicepixelratio = window.devicePixelRatio || 1;


//     const socket = socketRef.current;
// // const socket = io('http://localhost:3000');
//     // const x = canvas.width / 2;
//     // const y = canvas.height / 2;

//     const animate = () => {
//       c.fillStyle = 'rgba(0, 0, 0, 0.1)';
//       c.fillRect(0, 0, canvas.width, canvas.height);

//       for (const id in frontendplayers) {
//         frontendplayers[id].draw(c);
//       }

//       for (const id in frontendcoins) {
//         frontendcoins[id].draw(c);
//       }

//       for (const id in frontendpowerups) {
//         frontendpowerups[id].draw(c);
//       }

//       requestAnimationFrame(animate);
//     };
//     animate();

//     socket.on('countdown', (countdown: string) => {
//       const countdownElement = document.getElementById('countdown');
//       if (countdownElement) {
//         countdownElement.innerText = countdown;
//         if (countdown === 'Go!') {
//           setTimeout(() => {
//             countdownElement.innerText = '';
//           }, 1000);
//         } else if (countdown === 'Stop!') {
//           setTimeout(() => {
//             countdownElement.innerText = '';
//             const endpopElement = document.getElementById('endpop') as HTMLElement;
//             if (endpopElement) {
//               endpopElement.style.display = 'block';
//             }
//           }, 1000);
//         }
//       }
//     });

//     document.querySelectorAll('.power-up').forEach(button => {
//       button.addEventListener('click', () => {
//         const type = button.getAttribute('data-type') as PowerUpType;
//         if (powerupused[type]) {
//           selectedPowerUp = null;
//           powerupused[type] = false;
//         } else {
//           selectedPowerUp = type;
//           powerupused[type] = true;
//         }
//       });
//     });

//     canvas.addEventListener('click', event => {
//       if (selectedPowerUp) {
//         const x = event.clientX * devicePixelRatio;
//         const y = event.clientY * devicePixelRatio;
//         socket.emit('placePowerUp', { type: selectedPowerUp, x, y });
//         selectedPowerUp = null;
//       }
//     });

//     socket.on('updatePowerUps', (backendpowerups: any) => {
//       for (const id in backendpowerups) {
//         const powerup = backendpowerups[id];
//         if (!frontendpowerups[id]) {
//           frontendpowerups[id] = new Powerup({
//             x: powerup.x,
//             y: powerup.y,
//             radius: 20,
//             type: powerup.type,
//           });
//         }
//       }
//       for (const id in frontendpowerups) {
//         if (!backendpowerups[id]) {
//           delete frontendpowerups[id];
//         }
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
//         width: canvas.width,
//         height: canvas.height,
//         devicepixelratio
//       });
//     });

//     const colorarr = ['gray', 'gray', 'gray', 'gray', 'yellow', 'yellow', 'yellow', 'green', 'green', 'cyan'];

//     socket.on('updateCoins', (backendcoins: any) => {
//       for (const id in backendcoins) {
//         const coin = backendcoins[id];
//         if (!frontendcoins[id]) {
//           frontendcoins[id] = new Coin({
//             x: coin.x,
//             y: coin.y,
//             radius: 15,
//             color: colorarr[(coin.colornum) % 10]
//           });
//         }
//       }
//       for (const id in frontendcoins) {
//         if (!backendcoins[id]) {
//           delete frontendcoins[id];
//         }
//       }
//     });

//     socket.on('updatePlayers', (backendplayers: any) => {
//       for (const id in backendplayers) {
//         const backendplayer = backendplayers[id];
//         if (!frontendplayers[id]) {
//           frontendplayers[id] = new Player({
//             x: backendplayer.x,
//             y: backendplayer.y,
//             radius: 10,
//             color: backendplayer.color,
//           });
//           document.querySelector('#playerlabels')!.innerHTML += `<div data-id="${id}" data-score="${backendplayer.score}">${id} :${backendplayer.score} </div>`;
//         } else {
//           document.querySelector(`div[data-id=${id}]`)!.innerHTML = `${id} :${backendplayer.score}`;
//           // document.querySelector(`div[data-id=${id}]`).innerHTML = `${id} :${backendplayer.score}`;
//       if (id === socket.id) {
//         frontendplayers[id].x = backendplayer.x;
//         frontendplayers[id].y = backendplayer.y;

//         const lastbackendinputindex = playerinputs.findIndex((input) => backendplayer.sequencenumber === input.sequencenumber);

//         if (lastbackendinputindex > -1) {
//           playerinputs.splice(0, lastbackendinputindex + 1);
//         }

//         playerinputs.forEach((input) => {
//           frontendplayers[id].x += input.dx;
//           frontendplayers[id].y += input.dy;
//         });
//       } else {
//         frontendplayers[id].x = backendplayer.x;
//         frontendplayers[id].y = backendplayer.y;

//         gsap.to(frontendplayers[id], {
//           x: backendplayer.x,
//           y: backendplayer.y,
//           duration: 0.015,
//           ease: 'linear'
//         });
//       }
//     }
//   }
//       for (const id in frontendplayers) {
//         if (!backendplayers[id]) {
//           const divtodelete = document.querySelector(`div[data-id=${id}]`);
//           divtodelete!.parentNode!.removeChild(divtodelete!);
//           delete frontendplayers[id];
//         }
//       }
//     });

//     const keys = { w: { pressed: false }, a: { pressed: false }, s: { pressed: false }, d: { pressed: false } };
//     const speed = 10;
//     const playerinputs: { sequencenumber: number; dx: number; dy: number }[] = [];
//     let sequencenumber = 0;

//     setInterval(() => {
//       if (keys.w.pressed) {
//         sequencenumber++;
//         playerinputs.push({ sequencenumber, dx: 0, dy: -speed });
//         frontendplayers[socket.id].y -= speed;
//         socket.emit('keydown', { keycode: 'KeyW', sequencenumber });
//       }
//       if (keys.a.pressed) {
//         sequencenumber++;
//         playerinputs.push({ sequencenumber, dx: -speed, dy: 0 });
//         frontendplayers[socket.id].x -= speed;
//         socket.emit('keydown', { keycode: 'KeyA', sequencenumber });
//       }
//       if (keys.s.pressed) {
//         sequencenumber++;
//         playerinputs.push({ sequencenumber, dx: 0, dy: speed });
//         frontendplayers[socket.id].y += speed;
//         socket.emit('keydown', { keycode: 'KeyS', sequencenumber });
//       }
//       if (keys.d.pressed) {
//         sequencenumber++;
//         playerinputs.push({ sequencenumber, dx: speed, dy: 0 });
//         frontendplayers[socket.id].x += speed;
//         socket.emit('keydown', { keycode: 'KeyD', sequencenumber });
//       }
//     }, 15);

//     window.addEventListener('keydown', e => {
//       if (!frontendplayers[socket.id]) return;
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
//       }
//     });

//     window.addEventListener('keyup', e => {
//       if (!frontendplayers[socket.id]) return;
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
//       }
//     });
//   }, []);

//   return <canvas ref={canvasRef} />;
// };

// export default GameCanvas;
