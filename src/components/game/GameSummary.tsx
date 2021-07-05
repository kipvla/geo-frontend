/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { navigate } from 'gatsby';
import { useGameContext } from '../../lib/context/gameContext';
import Navbar from '../presentational/Navbar';

const Globe = React.lazy(() => import('react-globe.gl'));

const isBrowser = () => typeof window !== 'undefined';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => {
  const { game } = useGameContext();
  // const [arcShowing, setArcShowing] = useState();

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
            arcStroke={2}
          />
        </React.Suspense>
      ) : null}
      <div className="summary__container__left">
        <h3>
          <strong>{`POINTS: ${game.currentScore}`}</strong>
        </h3>
        {arcsData.map(({ startLat, startLng, endLat, endLng }, index) => (
          <p>
            <div style={{ borderBottom: `solid ${arcColors[index]}` }}>
              round # {index + 1}
            </div>
            <div>
              guess: {startLat.toFixed(2)}, {startLng.toFixed(2)}
            </div>
            <div>
              actual: {endLat.toFixed(2)}, {endLng.toFixed(2)}
            </div>
          </p>
        ))}
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
