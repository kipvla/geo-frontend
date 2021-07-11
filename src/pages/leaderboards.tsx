import React, { useEffect, useState } from 'react';
import Navbar from '../components/presentational/Navbar';
import { Leaderboard } from '../interfaces/index';
import apiService from '../services/apiService';

const Leaderboards: React.FC = () => {
  const [leaderboardStats, setLeaderboardStats] = useState<Leaderboard[]>([]);

  const getLeaderBoard = async () => {
    apiService
      .fetchLeaderboards()
      .then((res) => res.json())
      .then((data) => setLeaderboardStats(data.leaderboardResults));
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div className="page__container container page--leaderboards">
      <Navbar auth />
      <table className="leaderboards">
        <tr>
          <th>Username</th>
          <th>Games Played</th>
          <th>Cumulative Score</th>
          <th>Score/Game Ratio</th>
          <th>Experience</th>
          <th>Level</th>
        </tr>
        {leaderboardStats.length > 0 &&
          leaderboardStats.map((user, index) => (
            <>
              <tr key={index}>
                <td>
                  <strong>{user.username}</strong>
                </td>
                <td>{user.userTotalGameCounter}</td>
                <td>{user.currentScore}</td>
                <td>{user.scoreGameRatio.toFixed()}</td>
                <td>{user.exp}</td>
                <td>{user.currentLevel}</td>
              </tr>
            </>
          ))}
      </table>
    </div>
  );
};

export default Leaderboards;
