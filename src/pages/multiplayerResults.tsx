import React from 'react';
import Navbar from '../components/presentational/Navbar';
import useFetchMultiplayerGameID from '../lib/hooks/useFetchMultiplayerGameID';

const MultiplayerResults: React.FC = ({ location }) => {
  const gameResults = useFetchMultiplayerGameID(location?.state?.gameID);
  console.log(gameResults);
  return (
    <div className="page__container container">
      <Navbar auth />
      <table className="leaderboards">
        <tr>
          <th>Username</th>
          <th>Level</th>
          <th>Total Exp</th>
          <th>Current Score</th>
          <th>Rounds Finished</th>
          <th>Total Rounds</th>
        </tr>
        {gameResults &&
          gameResults.length > 0 &&
          gameResults.map((game, index) => (
            <>
              <tr key={index}>
                <td>{game.userInfo[0].username}</td>
                <td>{game.userInfo[0].currentLevel}</td>
                <td>{game.userInfo[0].exp}</td>
                <td>{game.currentScore}</td>
                <td>{game.currentTurn - 1}</td>
                <td>{game.locations.length}</td>
              </tr>
            </>
          ))}
      </table>
    </div>
  );
};

export default MultiplayerResults;
