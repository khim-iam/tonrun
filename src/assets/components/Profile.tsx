// import React from 'react';
// import { User } from '../../types';


// interface ProfileProps {
//   user: User;
// }

// const Profile: React.FC<ProfileProps> = ({ user }) => {
//   return (
//     <div>
//       <h2>Profile</h2>
//       <p>Account: {user.account}</p>
//       <p>TON Balance: {user.balance} TON</p>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';
import { User } from '../../types';
import './Profile.css';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Profile</h2>
        <img src="./pfp.jpg" alt="User" className="profile-image" />
        <p>Account: {user.account}</p>
        <p>TON Balance: {user.balance} TON</p>
      </div>
    </div>
  );
};

export default Profile;
