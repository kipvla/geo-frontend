/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { useGameContext } from '../../lib/context/gameContext';
import Navbar from '../presentational/Navbar';
import useFetchStats from '../../lib/hooks/useFetchStats';

const Globe = React.lazy(() => import('react-globe.gl'));

const isBrowser = () => typeof window !== 'undefined';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const MultiplayerGameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => {
  // TODO remove game context
  const { game } = useGameContext();
  const multiplayerStats = useFetchStats();
  const [round, setRound] = useState(0);

  console.log(multiplayerStats, '>>>>>>>>>>>>>>>>>>>>>>>>>');

  const arcColors = ['salmon', 'green', 'lightblue'];
  const multiPlayerArcsData = multiplayerStats.map((game, index) => ({
    startLat: game.guesses[round].lat,
    startLng: game.guesses[round].lng,
    endLat: +game.locations[round].latitude,
    endLng: +game.locations[round].longitude,
    color: arcColors[index],
    username: game.username,
  }));

  const arcsData = game.guesses.map(({ lng, lat }, index) => ({
    startLat: lat,
    startLng: lng,
    endLat: game.locations[index].lat,
    endLng: game.locations[index].lng,
    color: arcColors[index],
  }));

  console.log(multiPlayerArcsData, arcsData);

  return (
    <div>
      <Navbar auth />
      {isBrowser() ? (
        <React.Suspense
          fallback={
            <div className="page__container container spinner">...</div>
          }
        >
          <Globe
            backgroundColor="#fbf3ea"
            globeImageUrl="/images/earthlights4k.jpg"
            showGraticules
            arcsData={multiPlayerArcsData}
            arcColor="color"
            arcStroke={2}
          />
        </React.Suspense>
      ) : null}
      <div className="summary__container__left">
        <h1>MULTIPLAYERRRRRRRR</h1>
        <h3>
          <strong>{`POINTS: ${game.currentScore}`}</strong>
        </h3>
        {multiPlayerArcsData.map(
          ({ startLat, startLng, endLat, endLng, username }, index) => (
            <p key={username}>
              <div style={{ borderBottom: `solid ${arcColors[index]}` }}>
                {username}
              </div>
              <div>
                guess: {startLat.toFixed(2)}, {startLng.toFixed(2)}
              </div>
              <div>
                actual: {endLat.toFixed(2)}, {endLng.toFixed(2)}
              </div>
            </p>
          )
        )}
      </div>
      <div className="summary__container__right">
        <button
          type="button"
          className="button__primary"
          onClick={handleGameEnd}
        >
          back to games
        </button>
        {game.isMultiplayer && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setRound((prevRound) => {
                if (prevRound < 2) return prevRound + 1;
              });
            }}
            className="button__primary"
          >
            next round
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiplayerGameSummary;
