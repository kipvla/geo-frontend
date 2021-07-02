import React from 'react';
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

  const arcsData = game.guesses.map(({ lng, lat }, index) => ({
    startLat: lat,
    startLng: lng,
    endLat: game.locations[index].lat,
    endLng: game.locations[index].lng,
    // color: [
    //   ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    //   ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    // ],
    color: 'red',
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
            arcStroke={2}
            // onArcHover={setArcShowing}
          />
        </React.Suspense>
      ) : null}
      <div className="score__container">
        <p style={{ padding: '0.8rem' }}>{`POINTS: ${game.currentScore}`}</p>
        <button type="button" onClick={handleGameEnd}>
          back to games
        </button>
        {arcsData.map(({ startLat, startLng, endLat, endLng }) => (
          <p style={{ padding: '0.8rem' }}>
            <div>
              guess:
              {' '}
              {startLat.toFixed(2)}
              ,
              {' '}
              {startLng.toFixed(2)}
            </div>
            <div>
              actual:
              {' '}
              {endLat.toFixed(2)}
              ,
              {' '}
              {endLng.toFixed(2)}
            </div>
          </p>
        ))}
        {/* {arcShowing && <p>{arcShowing?.startLat}</p>} */}
      </div>
    </div>
  );
};

export default GameSummary;
