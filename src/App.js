import React from 'react';
import { Root } from 'pages';
import { ToneProvider } from 'contexts/ToneContext';

const App = () => (
  <ToneProvider>
    <Root />
  </ToneProvider>
);

export default App;
