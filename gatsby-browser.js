import React from 'react';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';

export const wrapRootElement = ({ element }) => (

  <GameProvider>
    <MapProvider>
      {element}
    </MapProvider>
  </GameProvider>
);

export default wrapRootElement;
