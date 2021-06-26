import React, { useState } from 'react';

const initialMapState = {
  viewport: {
    width: '50vw',
    height: '50vh',
    latitude: 22,
    longitude: -65,
    zoom: 0.6,
  },
};

export const GameContext = React.createContext(undefined);

// eslint-disable-next-line react/prop-types
const GameProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState(initialMapState);

  return (
    <GameContext.Provider value={{ map, setMap }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider };
