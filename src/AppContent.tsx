import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import Profile from './assets/components/Profile';
import RoomSelection from './assets/components/RoomSelection';
import MazeGame from './assets/components/MazeGame';
import { User } from './types';
import './App.css';

const AppContent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ account: '', balance: 0 });
  const navigate = useNavigate();
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

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

  return (
    <div>
      <header>
        <h1>TONRUN</h1>
        <TonConnectButton className="my-button-class" style={{ float: "right" }} />
      </header>
      {connected && <button onClick={() => navigate('/profile')}>Profile</button>}
      <button onClick={handlePlay}>Play</button>
      <Routes>
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/room-selection" element={<RoomSelection />} />
        <Route path="/private-room" element={<MazeGame />} />
      </Routes>
    </div>
  );
};

export default AppContent;

