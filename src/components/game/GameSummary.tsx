/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { navigate } from 'gatsby';
import { useGameContext } from '../../lib/context/gameContext';
import Navbar from '../presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));

const isBrowser = () => typeof window !== 'undefined';

const GameSummary: React.FC = () => {
  const { game } = useGameContext();

  const navToHighscores = () => {
    navigate('/multiplayerResults', {
      state: { gameID: game.multiplayerGameID },
    });
  };

  const arcColors = ['salmon', 'green', 'lightblue'];

  const arcsData = game.guesses.map(({ lng, lat }, index) => ({
    startLat: lat,
    startLng: lng,
    endLat: game.locations[index].lat,
    endLng: game.locations[index].lng,
    color: arcColors[index],
  }));

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
            arcsData={arcsData}
            arcColor="color"
            arcStroke={1.4}
          />
        </React.Suspense>
      ) : null}
      <div className="summary__container__left">
        <p>
          <h3>
            <strong>{`POINTS: ${game?.currentScore}`}</strong>
          </h3>
        </p>
        {game.guesses.map((guess, index) => (
          <div key={index} style={{ margin: '1rem' }}>
            <div style={{ borderBottom: `solid ${arcColors[index]}` }}>
              round # {index + 1}
            </div>
            <div>
              {guess.distance} km from {game.locations[index].title}
            </div>
          </div>
        ))}
      </div>
      <div className="summary__container__right">
        {game.isMultiplayer && (
          <button
            type="button"
            onClick={navToHighscores}
            className="button__primary"
          >
            see friend results
          </button>
        )}
      </div>
    </div>
  );
};

export default GameSummary;
