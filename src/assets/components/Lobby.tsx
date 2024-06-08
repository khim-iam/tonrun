import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Lobby.css';

const socket = io('https://localhost:5173/public-room'); // Ensure this is HTTPS and matches your server

const Lobby: React.FC = () => {
  const [players, setPlayers] = useState<{ [key: string]: { username: string, ready: boolean } }>({});
  const [username, setUsername] = useState('');
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('players', (players) => {
      setPlayers(players);
    });

    socket.on('startGame', () => {
      navigate('/private-room');
    });

    return () => {
      socket.off('players');
      socket.off('startGame');
    };
  }, [navigate]);

  const joinLobby = () => {
    socket.emit('joinLobby', username);
  };

  const toggleReady = () => {
    setIsReady(!isReady);
    socket.emit('setReady', !isReady);
  };

  return (
    
    <div className="lobby">
      <h2>Lobby</h2> 
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={joinLobby}>Join Lobby</button>
      </div>
      <ul>
        {Object.entries(players).map(([id, player]) => (
          <li key={id}>{player.username} - {player.ready ? 'Ready' : 'Not Ready'}</li>
        ))}
      </ul>
      <button onClick={toggleReady}>{isReady ? 'Unready' : 'Ready'}</button>
    </div>
    
  );
};

export default Lobby;
