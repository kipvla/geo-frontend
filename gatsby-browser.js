import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';
import { AuthProvider } from './src/lib/context/authContext';

// eslint-disable-next-line react/prop-types
const HackyFix = ({ element }) => {
  useEffect(() => {
    console.log('im here in the root element wrapper');
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <AuthProvider>
      <GameProvider>
        <MapProvider>{element}</MapProvider>
      </GameProvider>
    </AuthProvider>
  );
};

export const wrapRootElement = ({ element }) => <HackyFix element={element} />;

export default wrapRootElement;
