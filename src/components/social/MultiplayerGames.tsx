import React from 'react';
import useFetchMultiplayerGames from '../../lib/hooks/useFetchMultiplayerGames';

const MultiplayerGames: React.FC = () => {
  const games = useFetchMultiplayerGames();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {games && games.length ? (
        <>
          {games.map((game) => (
            <div
              style={{
                display: 'flex',
                width: '30%',
                justifyContent: 'space-between',
              }}
            >
              <p>{game.score}</p>
              <p>{game.lastPlayed}</p>
            </div>
          ))}
        </>
      ) : (
        <div>No Multiplayer games</div>
      )}
    </div>
  );
};
export default MultiplayerGames;
