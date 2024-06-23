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

import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import './Profile.css';
import { useTonWallet } from '@tonconnect/ui-react';

const Profile: React.FC<{ user: User }> = ({ user }) => {
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
    <div className="profile-container">
      <div className="profile-details">
        <h2>Profile</h2>
        <img src="./WickJohn3D.jpg" alt="User" className="profile-image" />

        {connected && (
          <>
            <p>user.account</p>
            <div>
              <img src="./TonToken.png" alt="TON Token" className="TonCoin" />
               <p>TON Balance: {user.balance} TON</p> 
            </div>
            <div>
              <img src="./transfer.png" alt="Transfer" />
            </div>
            <div>
              <img src="./dollar.png" alt="Dollar" className="Dollar" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
