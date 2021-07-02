import { navigate } from 'gatsby';
import React from 'react';
import { HiUserAdd } from 'react-icons/hi';
import { useGameContext } from '../../lib/context/gameContext';
import useFetchMultiplayerGames from '../../lib/hooks/useFetchMultiplayerGames';

const MultiplayerGames: React.FC = () => {
  const games = useFetchMultiplayerGames();
  const { populateMultiplayerScoreId } = useGameContext();

  const goToScores = (game) => {
    console.log(game, 'game');
    console.log(game.multiplayerGameID);

    populateMultiplayerScoreId(game.multiplayerGameID);
    navigate('/scores');
  };

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
              <div>
                <p>{game.score}</p>
                <p>{game.lastPlayed}</p>
              </div>
              <button
                type="button"
                className="button__primary"
                onClick={() => goToScores(game)}
              >
                <HiUserAdd />
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
