// import React, { useState, useEffect } from 'react';
// import './PrevGames.css';

// interface Game {
//   id: string;
//   players: { username: string; score: number }[];
//   date: string;
// }

// const PrevGames: React.FC = () => {
//   const [games, setGames] = useState<Game[]>([]);

//   useEffect(() => {
//     // Fetch previous games from the backend or mock data
//     const fetchGames = async () => {
//       // Replace this with a call to your backend API
//       const mockGames: Game[] = [
//         {
//           id: '1',
//           players: [
//             { username: 'Player1', score: 100 },
//             { username: 'Player2', score: 90 },
//             { username: 'Player3', score: 80 },
//           ],
//           date: '2024-05-30',
//         },
//         {
//           id: '2',
//           players: [
//             { username: 'Player4', score: 110 },
//             { username: 'Player5', score: 95 },
//             { username: 'Player6', score: 85 },
//           ],
//           date: '2024-05-31',
//         },
//         // Add more mock games as needed
//       ];

//       setGames(mockGames);
//     };

//     fetchGames();
//   }, []);

//   return (
//     <div className="prev-games">
//       <h2>Previous Games Leaderboards</h2>
//       {games.map((game) => (
//         <div key={game.id} className="game">
//           <h3>Game Date: {game.date}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {game.players.map((player, index) => (
//                 <tr key={index}>
//                   <td>{player.username}</td>
//                   <td>{player.score}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PrevGames;


import React, { useEffect, useState } from 'react';
import './PrevGames.css';

interface Game {
  id: number;
  playerName: string;
  score: number;
}

const PrevGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Mock API call to fetch previous games data
    const fetchGames = async () => {
      const response = await fetch('/api/previous-games');
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <div className="prev-games">
      <h2>Previous Games Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.playerName}</td>
              <td>{game.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrevGames;
