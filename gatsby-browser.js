import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';
import '@fontsource/darker-grotesque';

// eslint-disable-next-line react/prop-types
const HackyFix = ({ element }) => {
  useEffect(() => {
    console.log('im here in the root element wrapper');
    // apiService call to check if the token is valid
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <GameProvider>
      <MapProvider>{element}</MapProvider>
    </GameProvider>
  );
};

export const wrapRootElement = ({ element }) => <HackyFix element={element} />;

export default wrapRootElement;
