import React from 'react';
import { useGameContext } from '../../lib/context/gameContext';
import Navbar from '../presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));

const isBrowser = () => typeof window !== 'undefined';

const GameEndMap: React.FC = () => {
  const { game } = useGameContext();

  const arcsData = game.guesses.map(({ lng, lat }, index) => ({
    startLat: lat,
    startLng: lng,
    endLat: game.locations[index].lat,
    endLng: game.locations[index].lng,
    color: [
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ],
  }));

  return (
    <div>
      <Navbar auth />
      {isBrowser() ? (
        <React.Suspense fallback={<div />}>
          <Globe
            backgroundColor="white"
            globeImageUrl="/images/earthlights4k.jpg"
            showGraticules
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 500}
          />
        </React.Suspense>
      ) : null}
    </div>
  );
};

export default GameEndMap;
