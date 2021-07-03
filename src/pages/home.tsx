import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import Modal from '../components/presentational/Modal';
import Navbar from '../components/presentational/Navbar';
import InitMultiplayer from '../components/social/InitMultiplayer';
import { useUserContext, useGameContext } from '../lib/context';
import apiService from '../services/apiService';
import backgroundMap from '../images/globe.png';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, populateUser } = useUserContext();
  const { populateGame } = useGameContext();
  if (!user) return null;

  const fetchUser = async () => {
    await apiService
      .fetchUser()
      .then((res) => res.json())
      .then((userData) => populateUser(userData.user))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUser();
    console.log(user);
  }, []);

  const handleMultiplayerSetup = async () => {
    try {
      await apiService
        .startMultiplayerGame()
        .then((res) => res.json())
        .then((gameData) => populateGame(gameData));
      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSinglePlayerSetup = async () => {
    try {
      await apiService
        .fetchGame()
        .then((res) => res.json())
        .then((gameData) => populateGame(gameData));
      navigate('/game');
    } catch (e) {
      console.log(e);
    }
  };

  const handleResumeGame = async () => {
    // am assuming we will get their most recent active game?
    // fetch game by id
    // populate game context
    // navigate to game
  };

  return (
    <div className="container page__container">
      <Navbar auth />
      <img src={backgroundMap} width="50%" alt="hand drawn world" />

      <div className="shift__up">
        <button
          type="button"
          onClick={handleSinglePlayerSetup}
          className="button__primary"
        >
          single player
        </button>

        <button
          type="button"
          onClick={handleMultiplayerSetup}
          className="button__primary"
        >
          multi player
        </button>

        {/* conditionally render this */}
        <button
          type="button"
          onClick={handleResumeGame}
          className="button__primary"
        >
          resume game
        </button>
      </div>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <InitMultiplayer />
      </Modal>
    </div>
  );
};

export default Home;
