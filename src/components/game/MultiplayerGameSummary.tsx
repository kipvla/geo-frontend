import React, { useState } from 'react';

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
  const { multiplayerStats, game } = useFetchStats();
  const [round, setRound] = useState(0);

  const arcColors = ['salmon', 'green', 'lightblue', 'peru', 'thistle'];

  const multiPlayerArcsData = multiplayerStats.map((singleGame, index) => ({
    startLat: singleGame.guesses[round].lat,
    startLng: singleGame.guesses[round].lng,
    endLat: +singleGame.locations[round].latitude,
    endLng: +singleGame.locations[round].longitude,
    color: arcColors[index],
    username: singleGame.username,
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
            arcsData={multiPlayerArcsData}
            arcColor="color"
            arcStroke={1}
          />
        </React.Suspense>
      ) : null}
      <div className="summary__container__left">
        <div style={{ display: 'flex' }}>
          <button type="button" onClick={() => setRound(0)}>
            1
          </button>
          <button type="button" onClick={() => setRound(1)}>
            2
          </button>
          <button type="button" onClick={() => setRound(2)}>
            3
          </button>
        </div>
        <h3>
          <strong>{`My Points: ${game.currentScore}`}</strong>
        </h3>
        {multiplayerStats.map((userGame, index) => (
          <>
            <div key={index} style={{ position: 'fixed', bottom: 0, right: 0 }}>
              {!index ? <h1>{userGame.locations[round].title}</h1> : null}
            </div>

            <p key={userGame.username}>
              <div style={{ borderBottom: `solid ${arcColors[index]}` }}>
                {userGame.username}
              </div>
              <div>
                <p>
                  <div>
                    {userGame.guesses[round].distance}
                    {' '}
                    km away
                  </div>
                </p>
              </div>
            </p>
          </>
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
      </div>
    </div>
  );
};

export default MultiplayerGameSummary;
