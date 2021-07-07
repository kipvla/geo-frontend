import { navigate } from 'gatsby';
import React from 'react';
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
      populateGame({ game });

      navigate('/multiplayerResults', {
        state: { gameID: game.multiplayerGameID },
      });
    }
  };

  return (
    <div className="container">
      {games && games.length ? (
        <table className="multiplayer__table">
          <thead>
            <td>Score</td>
            <td>Last played</td>
            <td>Results</td>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr>
                <td>{game.score}</td>
                <td>{game.lastPlayed}</td>
                <td>
                  <button
                    onClick={() => handleRouting(game)}
                    type="button"
                    className="button__primary"
                  >
                    {game.active ? 'Play' : 'Results'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Multiplayer games</div>
      )}
    </div>
  );
};
export default MultiplayerGames;
