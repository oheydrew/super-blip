import React from 'react';
import { Root } from 'pages';
import { TransportProvider } from 'contexts/TransportContext';

const App = () => {
  console.log('🥾 AND 🐈 AND 🐝 Bees AND https://www.youtube.com/watch?v=Nni0rTLg5B8');

  return (
    <TransportProvider>
      <Root />
    </TransportProvider>
  );
};

export default App;
