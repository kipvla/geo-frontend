import { useEffect, useState } from 'react';
import * as moment from 'moment';
import apiService from '../../services/apiService';
import { useGameContext } from '../context/gameContext';

export default function useFetchStats() {
  const { multiplayerScoreId } = useGameContext();

  const [multiplayerStats, setMultiplayerStats] = useState([]);

  const getMultiplayerStats = async () => {
    try {
      const response = await apiService.fetchMultiplayerGamesByGameId(
        multiplayerScoreId
      );
      const body = await response.json();
      const allGames = body.results;
      const formatedGamesPromises = allGames.map(async (game) => {
        try {
          const responseUser = await apiService.fetchUserById(game.userID);
          const userBody = await responseUser.json();
          const { username } = userBody.user;

          return {
            ...game,
            updatedAt: moment(game.updatedAt).calendar(),
            username,
          };
        } catch (err) {
          console.log(err.message);
          return game;
        }
      });
      Promise.all(formatedGamesPromises).then((games) => {
        const sortedGames = games.sort(
          (a, b) => b.currentScore - a.currentScore
        );
        return setMultiplayerStats(sortedGames);
      });

      console.log(multiplayerStats);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMultiplayerStats();
  }, []);

  return multiplayerStats;
}
