import React from 'react';
import Tone from 'tone';

const ToneContext = React.createContext();

const ToneProvider = ({ children }) => {
  return <ToneContext.Provider value={Tone}>{children}</ToneContext.Provider>;
};

const useTone = () => {
  const context = React.useContext(ToneContext);

  if (context === undefined) {
    throw new Error('useTone must be used within a ToneProvider');
  }

  return context;
};

export { ToneProvider, useTone };
