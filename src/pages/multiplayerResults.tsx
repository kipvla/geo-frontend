import React from 'react';
import { navigate } from 'gatsby';
import Navbar from '../components/presentational/Navbar';
import MultiplayerGameSummary from '../components/game/MultiplayerGameSummary';
// import useFetchMultiplayerGameID from '../lib/hooks/useFetchMultiplayerGameID';

// eslint-disable-next-line no-unused-vars
const MultiplayerResults: React.FC = ({ location }: any) => (
  // const gameResults = useFetchMultiplayerGameID(location.state.gameID);

  <div className="page__container container">
    <Navbar auth />

    {/* <table className="leaderboards">
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
        </table> */}

    <MultiplayerGameSummary
      handleGameEnd={() => {
        navigate('/social');
      }}
      isMultiplayerResults
    />
  </div>
);
export default MultiplayerResults;
