import React from 'react';
import { Root } from 'pages';
import { ToneProvider } from 'audio/contexts/ToneContext';

const App = () => (
  <ToneProvider>
    <Root />
  </ToneProvider>
);

export default App;
