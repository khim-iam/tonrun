// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import twaLogo from './assets/tapps.png'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import { TonConnectButton } from '@tonconnect/ui-react';
// // import WebApp from '@twa-dev/sdk'

// function App() {
//   return (
//     <>
//     <div>
//       <header>
//         <h1>TONRUN</h1>
//       </header>
//       <TonConnectButton />
//     </div>
//     </>
//   )
// }

// export default App;

import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import AppContent from './AppContent';

const App: React.FC = () => {
  return (
    <TonConnectUIProvider manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TonConnectUIProvider>
  );
};

export default App;


