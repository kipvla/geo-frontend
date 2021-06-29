import React from 'react';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';
import { AuthProvider } from './src/lib/context/authContext';

export const wrapRootElement = ({ element }) => (

  <AuthProvider>
    <GameProvider>
      <MapProvider>
        {element}
      </MapProvider>
    </GameProvider>
  </AuthProvider>
);

export default wrapRootElement;
