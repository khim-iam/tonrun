import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSelection: React.FC = () => {
  const navigate = useNavigate();

  const handlePrivateRoom = () => {
    
    navigate('/private-room');
  };
  const handlePublicRoom = () => {
    navigate('/public-room');
  };

  return (
    <div>
      <h2>Select Room</h2>
      <button onClick={handlePublicRoom}>Public Room</button>
      <button onClick={handlePrivateRoom}>Private Room</button>
    </div>
  );
};

export default RoomSelection;
