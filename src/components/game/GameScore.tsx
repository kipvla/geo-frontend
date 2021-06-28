import React, { useEffect, useState } from 'react';
import StaticMap from '../presentational/StaticMap';
import { useMapContext } from '../../lib/context/mapContext';
import distanceBetweenTwoPoints from '../../lib/scoring/distance';
import calculateScore from '../../lib/scoring/score';

const initialScore = {
  distance: 0,
  points: 0,
};

const GameScore: React.FC = () => {
  const { pinCoordinates } = useMapContext();
  const [score, setScore] = useState(initialScore);
  const trueLocation = [2, 41];

  useEffect(() => {
    console.log(pinCoordinates);
    const distance = distanceBetweenTwoPoints(...pinCoordinates, trueLocation[0], trueLocation[1]);
    const points = calculateScore(distance);
    setScore({ distance, points });
  }, [pinCoordinates]);

  return (
    <div>
      <StaticMap />
      <p>{`DISTANCE: ${score.distance} km`}</p>
      <p>{`POINTS: ${score.points}`}</p>
    </div>
  );
};

export default GameScore;
