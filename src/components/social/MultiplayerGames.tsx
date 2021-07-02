import React, { useEffect } from 'react';
import apiService from '../../services/apiService';

const MultiplayerGames: React.FC = () => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await apiService
        .fetchAllUsers()
        .then((res) => res.json());
      console.log(response);
    };

    fetchAllUsers();
  }, []);
  return <p>Multiplayer Games</p>;
};
export default MultiplayerGames;
