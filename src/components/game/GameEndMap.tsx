import React from 'react';
import { useGameContext } from '../../lib/context/gameContext';

const Globe = React.lazy(() => import('react-globe.gl'));

const isBrowser = () => typeof window !== 'undefined';

const N = 20;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [
    ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
  ],
}));

const GameEndMap: React.FC = () => {
  const { game } = useGameContext();

  // const getPinPositions = (index: number) => {
  //   const guessLng = game.guesses[index].lng;
  //   const guessLat = game.guesses[index].lat;

  //   const targetLng = game.locations[index].lng;
  //   const targetLat = game.locations[index].lat;

  //   return {
  //     sourcePosition: [guessLng, guessLat],
  //     targetPosition: [targetLng, targetLat],
  //   };
  // };

  // const lineData = game.locations.map((_, locationIndex) =>
  //   getPinPositions(locationIndex)
  // );

  // const sourceLocations = game.locations.map(({ lng, lat }) => ({
  //   coordinates: [lng, lat],
  // }));

  // const targetLocations = game.guesses.map(({ lng, lat }) => ({
  //   coordinates: [lng, lat],
  // }));

  return (
    <div>
      <div>
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
      <p style={{ color: 'black' }}>{`POINTS: ${game.currentScore}`}</p>
    </div>
  );
};

export default GameEndMap;
