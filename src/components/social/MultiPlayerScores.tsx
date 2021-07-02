import React from 'react';

import useFetchStats from '../../lib/hooks/useFetchStats';

const MultiPlayerScores: React.FC = () => {
  const multiplayerStats = useFetchStats();
  return (
    <div className=" container">
      <h1>Scores</h1>
      {multiplayerStats &&
        multiplayerStats.map((stat) => (
          <div
            style={{
              display: 'flex',
              width: '20vw',
              justifyContent: 'space-between',
            }}
          >
            <p>{stat.username}</p>
            <p>{stat.currentScore}</p>
            <p>{stat.updatedAt}</p>
          </div>
        ))}
    </div>
  );
};
export default MultiPlayerScores;
