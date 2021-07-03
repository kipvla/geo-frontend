import React, { useEffect } from 'react';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Navbar from '../components/presentational/Navbar';
import { useUserContext } from '../lib/context/userContext';
import apiService from '../services/apiService';

const GameRequests: React.FC = () => {
  const { user, populateUser } = useUserContext();
  if (!user) return null;

  const acceptRequest = async (gameID: string) => {
    try {
      const response = await apiService.acceptGameInvite(gameID);
      if (response.ok) {
        const body = await response.json();
        populateUser(body.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const declineRequest = async (gameID: string) => {
    try {
      const response = await apiService.declineGameInvite(gameID);
      if (response.ok) {
        const body = await response.json();
        populateUser(body.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPendingGameRequests = async () => {
    try {
      const response = await apiService.fetchUser();
      const body = await response.json();
      populateUser(body.user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPendingGameRequests();
  }, []);

  return (
    <div className="page__container">
      <Navbar auth />
      <div className="gameRequest__container">
        {user.gameInvites.length > 0 ? (
          <>
            {user.gameInvites.map((gameRequest) => (
              <div key={gameRequest.gameID} className="gameRequest__block">
                <h2 style={{ marginLeft: '1rem' }}>{gameRequest.from}</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="button__primary"
                    onClick={() => acceptRequest(gameRequest.gameID)}
                  >
                    <AiOutlineCheckCircle />
                  </button>
                  <button
                    type="button"
                    className="button__primary"
                    onClick={() => declineRequest(gameRequest.gameID)}
                  >
                    <GiCancel />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No multiplayer game requests!</div>
        )}
      </div>
    </div>
  );
};
export default GameRequests;
