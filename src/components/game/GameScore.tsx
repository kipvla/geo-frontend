import React, { useEffect, useState } from 'react';
import StaticMap from '../presentational/StaticMap';
import { useGameContext } from '../../lib/context/gameContext';
import distanceBetweenTwoPoints from '../../lib/scoring/distance';
import calculateScore from '../../lib/scoring/score';

const initialScore = {
  distance: 0,
  points: 0,
};

const GameScore: React.FC = () => {
  const [score, setScore] = useState(initialScore);
  const { game } = useGameContext();
  const trueLocation = [2, 41];
  const i = game.guesses.length - 1;

  useEffect(() => {
    if (game.guesses.length) {
      const distance = distanceBetweenTwoPoints(
        game.guesses[i].lng,
        game.guesses[i].lat,
        trueLocation[0], // change me to game.location[i].lng
        trueLocation[1], // change me to game.location[i].lat
      );
      const points = calculateScore(distance);
      setScore({ distance, points });
    }
  }, [game]);

  return (
    <div>
      <StaticMap />
      <p>{`DISTANCE: ${score.distance} km`}</p>
      <p>{`POINTS: ${score.points}`}</p>
    </div>
  );
};

export default GameScore;
