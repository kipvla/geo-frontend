import React from 'react';
import StaticMap from '../presentational/StaticMap';
import { useGameContext } from '../../lib/context/gameContext';

const GameScore: React.FC = () => {
  const { game } = useGameContext();

  return (
    <div>
      <StaticMap />
      {game.guesses.length
        ? (
          <>
            {/* this could be nicer */}
            <p>{`DISTANCE: ${game.guesses[game.guesses.length - 1].distance} km`}</p>
            <p>{`POINTS: ${game.guesses[game.guesses.length - 1].score}`}</p>
          </>
        )
        : null}
    </div>
  );
};

export default GameScore;
