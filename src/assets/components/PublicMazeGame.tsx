import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './MazeGame.css';
import {TonRun} from '../../smartContract/wrappers/TonRun.ts'
import { useTonConnectUI } from '@tonconnect/ui-react'; // Import for TonConnect
import { useTonAddress} from '@tonconnect/ui-react';
import { Address, OpenedContract  } from "@ton/ton";
import { useTonClient } from '../../hooks/useTonClients.ts';
import { useAsyncInitialize } from '../../hooks/useAsyncInitialize';

const userAddress = Address.parse(useTonAddress());
// const userAddress = useTonAddress();
const contractAddress = "EQDyfAlrcoKHSo-IeafeYjMBNdtUmrLkqV3iGNJqxixljROw";
const queryId = 1234;
const client = useTonClient();
const tonRunContract = useAsyncInitialize(async () => {
  if (!client) return;
  const contract = new TonRun(
    Address.parse(contractAddress) // replace with your address from tutorial 2 step 8
  );
  return client.open(contract) as OpenedContract<TonRun>;
}, [client]);





const socket: Socket = io('https://localhost:3000'); // Use HTTPS

const canvasWidth = 500;
const canvasHeight = 500;
const cellSize = 20; // Size of each cell

interface Player {
  username: string;
  league: number;
  ready: boolean;
  position: { x: number, y: number };
}

interface ServerResponse {
  success: boolean;
  message?: string;
}

const PublicMazeGame: React.FC = () => {
  const [players, setPlayers] = useState<{ [key: string]: Player }>({});
  const [username, setUsername] = useState('');
  const [league, setLeague] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tonConnectUI] = useTonConnectUI(); // TonConnect instance

  const paymentAmounts = {
    1: '10000000', // 1 Ton for League 1 (in nanotons)
    2: '20000000', // 2 Ton for League 2 (in nanotons)
    3: '30000000', // 3 Ton for League 3 (in nanotons)
  };

  useEffect(() => {
    socket.on('players', (players: { [key: string]: Player }) => {
      console.log('Players updated:', players);
      setPlayers(players);
    });

    socket.on('startGame', () => {
      console.log('Game started');
      setGameStarted(true);
    });

    return () => {
      socket.off('players');
      socket.off('startGame');
    };
  }, []);

  type SendTransactionRequest = {
    messages: {
        address: string;
        amount: string;
    }[];
    validUntil: number;
};

  // const sendTransaction = async (transaction: { messages: { address: string; amount: string }[] }) => {
  //   try {
  //     await tonConnectUI.sendTransaction(transaction);
  //   } catch (error) {
  //     console.error('Error sending transaction:', error);
  //     alert('Transaction failed!');
  //   }
  // };
  const sendTransaction = async (transaction: SendTransactionRequest) => {
    try {
        await tonConnectUI.sendTransaction(transaction);
    } catch (error) {
        console.error('Error sending transaction:', error);
        alert('Transaction failed!');
    }
};


  const joinLobby = () => {
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }


    const paymentAmount = paymentAmounts[league as keyof typeof paymentAmounts];

    if (!paymentAmount) {
      alert('Invalid league selection');
      return;
    }

    const transaction = {
      messages: [
          {
              address: "0QCXG6BWBXt6Nuf0gDTUnwLZHzaGKEyzH3HcceK4vcynbb_8", // destination address
              amount: paymentAmount.toString() // Toncoin in nanotons
          }
      ],
      validUntil: Math.floor(Date.now() / 1000) + 3600 // valid for the next 1 hour (3600 seconds)
  }
  
    sendTransaction(transaction); // Call the separate async function

    tonRunContract.sendGameMoney(userAddress, BigInt(league), BigInt(queryId))



    console.log(`Joining lobby with username: ${username}, league: ${league}, room: public`);
    console.log('Emitting joinLobby with data:', { username, league, room: 'public' });
    socket.emit('joinLobby', { username, league, room: 'public' }, (response: ServerResponse) => {
      console.log('Server response:', response);
    });
   
  };

  const toggleReady = () => {
    setIsReady(!isReady);
    socket.emit('setReady', { ready: !isReady, room: 'public' });
  };

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
    if (gameStarted) {
      const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
      window.addEventListener('keydown', keyDownHandler);

      return () => {
        window.removeEventListener('keydown', keyDownHandler);
      };
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      drawCanvas();
    }
  }, [players, gameStarted]);

  const endGame = () => {
    navigate('/tonrun/');
  };

  return (
    <div>
      {!gameStarted ? (
        <div className="lobby">
          <h2>Lobby</h2>
          <div>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <select value={league} onChange={(e) => setLeague(Number(e.target.value))}>
              <option value={1}>League 1</option>
              <option value={2}>League 2</option>
              <option value={3}>League 3</option>
            </select>
            <button onClick={joinLobby}>Join Lobby</button>
          </div>
          <ul>
            {Object.entries(players).map(([id, player]) => (
              <li key={id}>
                {player.username} - League {player.league} - {player.ready ? 'Ready' : 'Not Ready'}
              </li>
            ))}
          </ul>
          <button onClick={toggleReady}>{isReady ? 'Unready' : 'Ready'}</button>
        </div>
      ) : (
        <div>
          <h2>Public Maze Game</h2>
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
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
      )}
    </div>
  );
};

export default PublicMazeGame;
