import React, { useEffect, useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { navigate } from 'gatsby';
import Navbar from '../presentational/Navbar';
import { useGameContext, useUserContext } from '../../lib/context';
import apiService from '../../services/apiService';

const GameRequests: React.FC = () => {
  const { user, populateUser } = useUserContext();
  const { populateGame } = useGameContext();
  const [notifications, setNotifications] = useState(user?.gameInvites.length);
  if (!user) return null;

  const acceptRequest = async (gameID: string) => {
    try {
      const response = await apiService.acceptGameInvite(gameID);
      if (response.ok) {
        const body = await response.json();
        populateGame(body);
        setNotifications(user?.gameInvites.length - 1);
        navigate('/game');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const declineRequest = async (gameID: string) => {
    try {
      const response = await apiService.declineGameInvite(gameID);
      if (response.ok) {
        const userData = await apiService.fetchUser();
        const userBody = await userData.json();
        populateUser(userBody.user);
        setNotifications(user?.gameInvites.length - 1);
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
    <div className="gameRequest__container container column">
      <Navbar auth notifications={notifications} />
      <div className="container column">
        {user?.gameInvites.length > 0 ? (
          <>
            <h2>game requests</h2>
            {user.gameInvites.map((gameRequest) => (
              <div key={gameRequest.gameID} className="gameRequest__block">
                <h2 style={{ marginLeft: '1rem' }}>{gameRequest.from}</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="button__success"
                    onClick={() => acceptRequest(gameRequest.gameID)}
                  >
                    <AiOutlineCheckCircle />
                  </button>
                  <button
                    type="button"
                    className="button__warning"
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
