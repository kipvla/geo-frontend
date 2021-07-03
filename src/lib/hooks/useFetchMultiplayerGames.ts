import { useEffect, useState } from 'react';
import * as moment from 'moment';
import apiService from '../../services/apiService';

export default function useFetchMultiplayerGames() {
  const [multiplayerGames, setMultiplayerGames] = useState([]);
  const fetchGames = async () => {
    const allGames = await apiService
      .fetchAllMultiplayerGames()
      .then((res) => res.json());
    setMultiplayerGames(allGames.results);
    console.log(allGames);
    // TODO played with
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return multiplayerGames.map((game) => ({
    ...game,
    score: game.currentScore,
    lastPlayed: moment(game.updatedAt).calendar(),
    multiplayerGameID: game.multiplayerGameID,
  }));
}
