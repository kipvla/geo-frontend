import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { MapProvider } from './src/lib/context/mapContext';
import { GameProvider } from './src/lib/context/gameContext';
import { UserProvider } from './src/lib/context/userContext';
import './src/styles/index.css';
import '@fontsource/darker-grotesque';
// import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from './src/components/presentational/Layout';

// eslint-disable-next-line react/prop-types
const HackyFix = ({ element }) => {
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <Layout>
      <UserProvider>
        <GameProvider>
          <MapProvider>{element}</MapProvider>
        </GameProvider>
      </UserProvider>
    </Layout>
  );
};

export const wrapRootElement = ({ element }) => <HackyFix element={element} />;

export default wrapRootElement;
