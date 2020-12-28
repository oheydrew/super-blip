import React, { useState } from 'react';

const TransportContext = React.createContext();

const TransportProvider = ({ children }) => {
  // For React Rendering. Controlled by Play/Stop button - Matches ToneJS Transport state
  const [playing, setPlaying] = useState(false);

  // For React Rendering. Controlled by ToneJS Sequence Loop
  const [playHeadPosition, setPlayHeadPosition] = useState(0);

  return (
    <TransportContext.Provider value={{ playing, setPlaying, playHeadPosition, setPlayHeadPosition }}>
      {children}
    </TransportContext.Provider>
  );
};

const useTransport = () => {
  const context = React.useContext(TransportContext);

  if (context === undefined) {
    throw new Error('useTransport must be used within a TransportContext');
  }

  return context;
};

export { TransportProvider, useTransport };
