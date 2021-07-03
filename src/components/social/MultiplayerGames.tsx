import React from 'react';
import { navigate } from 'gatsby';
import useFetchMultiplayerGames from '../../lib/hooks/useFetchMultiplayerGames';
import { useGameContext } from '../../lib/context/gameContext';

const MultiplayerGames: React.FC = () => {
  const games = useFetchMultiplayerGames();
  const { populateGame } = useGameContext();
  const handleRouting = (game: any) => {
    if (game.active) {
      populateGame({ game });
      navigate('/game');
    } else {
      navigate('/multiplayerResults', {
        state: { gameID: game.multiplayerGameID },
      });
    }
  };

  return (
    <div className="container">
      {games && games.length ? (
        <>
          {games.map((game) => (
            <div className="multiplayer__game__container">
              <p>{game.score}</p>
              <p>{game.lastPlayed}</p>
              <button onClick={() => handleRouting(game)} type="button">
                {game.active ? 'Play' : 'See Results'}
              </button>
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
