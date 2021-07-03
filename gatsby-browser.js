import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';
import { UserProvider } from './src/lib/context/userContext';
import './src/styles/index.css';
import '@fontsource/darker-grotesque';
// import 'mapbox-gl/dist/mapbox-gl.css';

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
    <UserProvider>
      <GameProvider>
        <MapProvider>{element}</MapProvider>
      </GameProvider>
    </UserProvider>
  );
};

export const wrapRootElement = ({ element }) => <HackyFix element={element} />;

export default wrapRootElement;
