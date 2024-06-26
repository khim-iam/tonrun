import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import Profile from './assets/components/Profile';
import PrivateMazeGame from './assets/components/PrivateMazeGame';
// import PublicMazeGame from './assets/components/PublicMazeGame';
import PrevGames from './assets/components/PrevGames';
import SkinShop from './assets/components/SkinShop';
// import GameCanvas from './assets/components/GameCanvas';
// import App1 from './assets/components/frontend';
// import GameMaze from './assets/components/MazeGame';
import { User } from './types';
import './App.css';
import { getTonBalance } from './utils/tonUtils';
import Game from './assets/components/Game';

const AppContent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ account: '', balance: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = useTonWallet();
  const address = useTonAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        console.log(`Fetching balance for address: ${address}`);
        try {
          const balance = await getTonBalance(address);
          console.log(`Fetched balance: ${balance}`);
          setUser({ account: address, balance });
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    if (wallet) {
      setConnected(true);
      fetchBalance();
    } else {
      setConnected(false);
      setUser({ account: '', balance: 0 });
    }
  }, [wallet, address]);

  const handlePrivateRoom = () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    navigate('/private-room');
  };

  // const handlePublicRoom = () => {
  //   if (!connected) {
  //     alert('Please connect your wallet first!');
  //     return;
  //   }
  //   navigate('/public-room');
  // };

  const handlePrevGames = () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    navigate('/previous-games');
  };

  const handleSkinShop = () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    navigate('/skin-shop');
  };

  const handlegame = () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    navigate('/game-window');
  };

  const showBackButton = location.pathname === '/private-room' || location.pathname === '/previous-games' || location.pathname === '/skin-shop';
  const hideMainPageContentPaths = ['/public-room', '/private-room', '/public-game', '/previous-games', '/skin-shop', '/game-window'];
  const shouldHideMainPageContent = hideMainPageContentPaths.includes(location.pathname);
  const handleClick = () => {
    window.open('https://ton.org/en/dev', '_blank');
  };
  return (
    <div id="main-div">
      {!shouldHideMainPageContent && (
        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <img src="./ton_logo 1.png" alt="TONRUN" className="GameName" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <TonConnectButton className="my-button-class" />
            <Profile user={user} />
          </div>
        </header>
      )}

      {!shouldHideMainPageContent && connected && (
        <div>
          <div className="container">
            <div className="button-group">
              {/* <button className="button" onClick={handlePublicRoom}> */}
              <button className="button" onClick={handleClick}>
      <img src='./Button.png' alt="Start" />
    </button>
            </div>
            <div className="button-group">
              <button className="button" onClick={handlegame} id="game-font">
                Game
              </button>
            </div>
            <div className="button-group">
              <button className="button" onClick={handlePrivateRoom}>
                <img src='./PvtRoom.png' alt="Private Room" />
              </button>
            </div>
            <div className="button-group">
              <button className="button" onClick={handlePrevGames}>
                <img src='./PrevGame.png' alt="Previous Game" />
              </button>
              <button className="button" onClick={handleSkinShop}>
                <img src='./SkinShop.png' alt="Skin Shop" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Routes>
        {/* <Route path="/tonrun/" element={<div>Welcome to TONRUN</div>} /> */}
        {/* <Route path="/public-room" element={<PublicMazeGame />} />
        <Route path="/private-room" element={<PrivateMazeGame />} /> */}
        <Route path="/public-room" element={<Game user={user}/>} />
        <Route path="/private-room" element={<PrivateMazeGame />} />
        <Route path="/public-game" element={<Game user={user}/>} />
        {/* <Route path="/public-game" element={<GameMaze />} /> */}
        {/* <Route path="/public-game" element={<GameCanvas />} /> */}
        {/* <Route path="/public-game" element={<App1 />} /> */}
        <Route path="/previous-games" element={<PrevGames />} />
        <Route path="/skin-shop" element={<SkinShop />} />
        <Route path="/game-window" element={<Game user={user}/>} />

      </Routes>
      {showBackButton && <button onClick={() => navigate('/tonrun/')}>Back</button>}
    </div>
  );
};

export default AppContent;





// import { useState, useEffect } from 'react';
// import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
// import Profile from './assets/components/Profile';
// // import RoomSelection from './assets/components/RoomSelection';
// import PrivateMazeGame from './assets/components/PrivateMazeGame';
// import PublicMazeGame from './assets/components/PublicMazeGame';
// import PrevGames from './assets/components/PrevGames';
// import SkinShop from './assets/components/SkinShop';
// import GameCanvas from './assets/components/GameCanvas';

// // import Lobby from './assets/components/Lobby'; // Import the Lobby component
// import { User } from './types';
// import './App.css';
// import { getTonBalance } from './utils/tonUtils';

// const AppContent: React.FC = () => {
//   const [connected, setConnected] = useState<boolean>(false);
//   const [user, setUser] = useState<User>({ account: '', balance: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const wallet = useTonWallet();
//   const address = useTonAddress();

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (address) {
//         console.log(`Fetching balance for address: ${address}`);
//         try {
//           const balance = await getTonBalance(address);
//           console.log(`Fetched balance: ${balance}`);
//           setUser({ account: address, balance });
//         } catch (error) {
//           console.error('Error fetching balance:', error);
//         }
//       }
//     };

//     if (wallet) {
//       setConnected(true);
//       fetchBalance();
//     } else {
//       setConnected(false);
//       setUser({ account: '', balance: 0 });
//     }
//   }, [wallet, address]);

//   // const handlePlay = () => {
//   //   if (!connected) {
//   //     alert('Please connect your wallet first!');
//   //     return;
//   //   }
//   //   navigate('/room-selection');
//   // };
//   const handlePrivateRoom = () => {
//     if (!connected) {
//       alert('Please connect your wallet first!');
//       return;
//     }
//     navigate('/private-room');
//   };
//   const handlePublicRoom = () => {
//     if (!connected) {
//       alert('Please connect your wallet first!');
//       return;
//     }
//     navigate('/public-room');
//   };
//   const handlePrevGames = () => {
//     if (!connected) {
//       alert('Please connect your wallet first!');
//       return;
//     }
//     navigate('/previous-games');
//   };
//   const handleSkinShop = () => {
//     if (!connected) {
//       alert('Please connect your wallet first!');
//       return;
//     }
//     navigate('/skin-shop');
//   };

//   // const showPlayAndProfileButtons = location.pathname === '/tonrun/';
//   const showBackButton = location.pathname === '/private-room' || location.pathname === '/previous-games';
//   //  || location.pathname === '/public-room';

//   // List of paths where the main page content should not be displayed
//   const hideMainPageContentPaths = ['/public-room', '/private-room', '/public-game','/previous-games'];

//   // Check if the current path matches any of the paths to hide main page content
//   const shouldHideMainPageContent = hideMainPageContentPaths.includes(location.pathname);

//   return (

//     <div>
//   {!shouldHideMainPageContent && (

//       // <header>
//       //   <h1>TONRUN</h1>
//       //   <TonConnectButton className="my-button-class" style={{ float: "right" }} />

//       //   <Profile user={user} />

//       // </header>

//       <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <h1>TONRUN</h1>
//       {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}> */}
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

//         <TonConnectButton className="my-button-class" />
//         <Profile user={user} />
//       </div>
//     </header>

// )}

//       {/* {showPlayAndProfileButtons && connected && <button onClick={() => navigate('/profile')}>Profile</button>} */}

//   {!shouldHideMainPageContent && (

//       <div>

//       <h2>Select Room</h2>
//       <button onClick={handlePublicRoom}>Play Now</button>
//       <button onClick={handlePrivateRoom}>Private Room</button>
//       <div>
//       <button onClick={handlePrevGames}>Previous Games</button>
//       <button onClick={handleSkinShop}>Skin Shop</button>
//       </div>
//     </div>

    

//   )}

//       {/* {showPlayAndProfileButtons && <button onClick={handlePlay}>Play</button>} */}
//       <Routes>
//         <Route path="/tonrun/" element={<div>Welcome to TONRUN</div>} />
//         {/* <Route path="/profile" element={<Profile user={user} />} /> */}
//         {/* <Route path="/room-selection" element={<RoomSelection />} /> */}
//         {/* <Route path="/public-room" element={<Lobby />} /> */}
//         <Route path="/public-room" element={<PublicMazeGame />} />
//         <Route path="/private-room" element={<PrivateMazeGame />} />
//         <Route path="/public-game" element={<GameCanvas />} />
//         <Route path="/previous-games" element={<PrevGames />} />
//         <Route path="/skin-shop" element={<SkinShop />} />



//         {/* <Route path="/public-maze" element={<PublicMazeGame />} /> */}
//       </Routes>
//       {showBackButton && <button onClick={() => navigate('/tonrun/')}>Back</button>}

//     </div>
//   );
// };

// export default AppContent;






