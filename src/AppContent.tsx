import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import Profile from './assets/components/Profile';
import RoomSelection from './assets/components/RoomSelection';
import MazeGame from './assets/components/MazeGame';
import { User } from './types';
import './App.css';

const AppContent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ account: '', balance: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = useTonWallet();
  const address = useTonAddress();

  useEffect(() => {
    if (wallet) {
      setConnected(true);
      setUser({ account: address, balance: 100 }); // Replace with actual balance fetching
    } else {
      setConnected(false);
      setUser({ account: '', balance: 0 });
    }
  }, [wallet, address]);

  const handlePlay = () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    navigate('/room-selection');
  };

  const showPlayAndProfileButtons = location.pathname === '/tonrun/';
  const showBackButton = location.pathname === '/profile';

  return (
    <div>
      <header>
        <h1>TONRUN</h1>
        <TonConnectButton className="my-button-class" style={{ float: "right" }} />
      </header>
      {showPlayAndProfileButtons && connected && <button onClick={() => navigate('/profile')}>Profile</button>}
      {showPlayAndProfileButtons && <button onClick={handlePlay}>Play</button>}
      {showBackButton && <button onClick={() => navigate('/tonrun/')}>Back</button>}
      <Routes>
        <Route path="/" element={<div>Welcome to TONRUN</div>} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/room-selection" element={<RoomSelection />} />
        <Route path="/private-room" element={<MazeGame />} />
      </Routes>
    </div>
  );
};

export default AppContent;


// import { useState, useEffect } from 'react';
// import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
// import Profile from './assets/components/Profile';
// import RoomSelection from './assets/components/RoomSelection';
// import MazeGame from './assets/components/MazeGame';
// import { User } from './types';
// import './App.css';

// const AppContent: React.FC = () => {
//   const [connected, setConnected] = useState<boolean>(false);
//   const [user, setUser] = useState<User>({ account: '', balance: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const wallet = useTonWallet();
//   const address = useTonAddress();

//   useEffect(() => {
//     if (wallet) {
//       setConnected(true);
//       setUser({ account: address, balance: 100 }); // Replace with actual balance fetching
//     } else {
//       setConnected(false);
//       setUser({ account: '', balance: 0 });
//     }
//   }, [wallet, address]);

//   const handlePlay = () => {
//     if (!connected) {
//       alert('Please connect your wallet first!');
//       return;
//     }
//     navigate('/room-selection');
//   };

//   const showButtons = location.pathname === '/tonrun/' || location.pathname === '/profile';

//   return (
//     <div>
//       <header>
//         <h1>TONRUN</h1>
//         <TonConnectButton className="my-button-class" style={{ float: "right" }} />
//       </header>
//       {showButtons && connected && <button onClick={() => navigate('/profile')}>Profile</button>}
//       {showButtons && <button onClick={handlePlay}>Play</button>}
//       <Routes>
//         <Route path="/" element={<div>Welcome to TONRUN</div>} />
//         <Route path="/profile" element={<Profile user={user} />} />
//         <Route path="/room-selection" element={<RoomSelection />} />
//         <Route path="/private-room" element={<MazeGame />} />
//       </Routes>
//     </div>
//   );
// };

// export default AppContent;
