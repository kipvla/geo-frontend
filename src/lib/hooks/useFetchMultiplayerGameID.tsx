import { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import { useGameContext } from '../context';

export default function useFetchMultiplayerGameID(gameID: string) {
  const [multiplayerGames, setMultiplayerGames] = useState([]);
  const { populateGame } = useGameContext();
  const fetchGames = async () => {
    const allGames = await apiService
      .fetchMultiplayerGamesByGameId(gameID)
      .then((res) => res.json());
    setMultiplayerGames(allGames.results);
    // TODO played with
    console.log(allGames.results[0]);

    populateGame(allGames.results[0]);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return multiplayerGames;
}
