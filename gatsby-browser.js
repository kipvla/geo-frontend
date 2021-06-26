import React from 'react';
import { GameProvider } from './src/lib/context/gameContext';

export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <GameProvider>
    {element}
  </GameProvider>
);

export default wrapRootElement;
