import React from 'react';
import ResultsMap from '../presentational/ResultsMap';
import { useGameContext } from '../../lib/context/gameContext';

const GameScore: React.FC = () => {
  const { game } = useGameContext();

  let index = 0;
  let sourcePosition: [number, number] = [0, 0];
  let targetPosition: [number, number] = [0, 0];

  if (game.guesses.length) {
    index = game.guesses.length - 1;

    const guessLng = game.guesses[index].lng;
    const guessLat = game.guesses[index].lat;
    sourcePosition = [guessLng, guessLat];

    const targetLng = game.locations[index].lng;
    const targetLat = game.locations[index].lat;
    targetPosition = [targetLng, targetLat];
  }

  return (
    <div className="container modal__focus">
      {game.guesses.length ? (
        <>
          <ResultsMap
            sourcePosition={sourcePosition}
            targetPosition={targetPosition}
          />
          <div>{`DISTANCE: ${game.guesses[index].distance} km`}</div>
          <div>{`POINTS: ${game.guesses[index].score}`}</div>
        </>
      ) : null}
    </div>
  );
};

export default GameScore;
