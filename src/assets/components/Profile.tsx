import React from 'react';
import { User } from '../../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Account: {user.account}</p>
      <p>TON Balance: {user.balance}</p>
    </div>
  );
};

export default Profile;
