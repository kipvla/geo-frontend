import { useEffect, useState } from 'react';
import * as moment from 'moment';
import apiService from '../../services/apiService';
import { useGameContext } from '../context/gameContext';

export default function useFetchStats() {
  const { game } = useGameContext();

  const [multiplayerStats, setMultiplayerStats] = useState([]);

  const getMultiplayerStats = async () => {
    try {
      const response = await apiService.fetchMultiplayerGamesByGameId(
        game.multiplayerGameID
      );
      const body = await response.json();
      const allGames = body.results;
      const formatedGamesPromises = allGames.map(async (gameFromAllGames) => {
        try {
          const responseUser = await apiService.fetchUserById(
            gameFromAllGames.userID
          );
          const userBody = await responseUser.json();
          const { username } = userBody.user;

          return {
            ...gameFromAllGames,
            updatedAt: moment(gameFromAllGames.updatedAt).calendar(),
            username,
          };
        } catch (err) {
          console.log(err.message);
          return gameFromAllGames;
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

  return { multiplayerStats, game };
}
