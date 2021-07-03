import { useEffect, useState } from 'react';
import apiService from '../../services/apiService';

export default function useFetchMultiplayerGameID(gameID: string) {
  const [multiplayerGames, setMultiplayerGames] = useState([]);
  const fetchGames = async () => {
    const allGames = await apiService
      .fetchMultiplayerGamesByGameId(gameID)
      .then((res) => res.json());
    setMultiplayerGames(allGames.results);
    // TODO played with
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return multiplayerGames;
}
