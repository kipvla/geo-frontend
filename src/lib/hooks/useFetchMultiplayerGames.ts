import { useEffect, useState } from 'react';
import * as moment from 'moment';
import apiService from '../../services/apiService';

export default function useFetchMultiplayerGames() {
  const [multiplayerGames, setMultiplayerGames] = useState([]);
  const fetchGames = async () => {
    try {
      const allGames = await apiService
        .fetchAllMultiplayerGames()
        .then((res) => res.json());
      setMultiplayerGames(allGames.results);
      // TODO played with
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    multiplayerGames.map((game) => ({
      ...game,
      score: game.currentScore,
      lastPlayed: moment(game.updatedAt).calendar(),
      multiplayerGameID: game.multiplayerGameID,
    })) || multiplayerGames
  );
}
