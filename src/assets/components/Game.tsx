// import React, { useState, useEffect } from "react";
// import { User } from "../../types";
// import "./Game.css";
// import { useTonWallet } from "@tonconnect/ui-react";

// import GameCanvas from "../../utils/GameCanvas";

// const Game: React.FC<{ user: User }> = ({ user }) => {
//   const [connected, setConnected] = useState<boolean>(false);
//   const wallet = useTonWallet();

//   useEffect(() => {
//     if (wallet) {
//       setConnected(true);
//     } else {
//       setConnected(false);
//     }
//   }, [wallet]);

//   return (
//     <div id="game-canvas">
//       {/* <canvas></canvas> */}
//       <GameCanvas />
//       <div id="controls">
//         <button className="control-button" id="move-up">
//           ▲
//         </button>
//         <button className="control-button" id="move-left">
//           ◀
//         </button>
//         <button className="control-button" id="move-down">
//           ▼
//         </button>
//         <button className="control-button" id="move-right">
//           ▶
//         </button>
//       </div>
//       <div id="powerups">
//         <button className="powerup-button" id="speed">
//           Speed
//         </button>
//         <button className="powerup-button" id="slow">
//           Slow
//         </button>
//         <button className="powerup-button" id="pause">
//           Pause
//         </button>
//       </div>
//       <div id="player-scores">
//         <div className="player-score">
//           <span className="username">Player1</span>: <span className="score">900</span>
//         </div>
//         <div className="player-score">
//           <span className="username">Player2</span>: <span className="score">800</span>
//         </div>
//         <div className="player-score">
//           <span className="username">Player3</span>: <span className="score">600</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Game;

import React, { useState, useEffect } from "react";
import { User } from "../../types";
import "./Game.css";
import { useTonWallet } from "@tonconnect/ui-react";

import GameCanvas from "../../utils/GameCanvas";

const Game: React.FC<{ user: User }> = ({ user }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [wallet]);

  return (
    <div id="game-canvas">
      <GameCanvas />
      <div id="controls">
        <button className="control-button" id="move-up">
          ▲
        </button>
        <button className="control-button" id="move-left">
          ◀
        </button>
        <button className="control-button" id="move-down">
          ▼
        </button>
        <button className="control-button" id="move-right">
          ▶
        </button>
      </div>
      <div id="powerups">
        <button className="powerup-button" id="speed">
          Speed
        </button>
        <button className="powerup-button" id="slow">
          Slow
        </button>
        <button className="powerup-button" id="pause">
          Pause
        </button>
      </div>
      <div id="player-scores">
        <div className="player-score">
          <span className="username">Player1</span>: <span className="score">900</span>
        </div>
        <div className="player-score">
          <span className="username">Player2</span>: <span className="score">800</span>
        </div>
        <div className="player-score">
          <span className="username">Player3</span>: <span className="score">600</span>
        </div>
      </div>
      <div id="user-info">
        <p>Account: {user.account}</p>
        <p>Balance: {user.balance}</p>
        <p>Status: {connected ? "Connected" : "Not Connected"}</p>
      </div>
    </div>
  );
};

export default Game;
