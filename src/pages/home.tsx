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
  const [hasGameToResume, setHasGameToResume] = useState(false);
  const [gameToResume, setGameToResume] = useState(null);
  const { user, populateUser } = useUserContext();
  const { populateGame } = useGameContext();
  if (!user) return null;

  const fetchUser = async () => {
    await apiService
      .fetchUser()
      .then((res) => res.json())
      .then((userData) => {
        if (userData.gameToResume) {
          setHasGameToResume(true);
          setGameToResume(userData.gameToResume);
        }
        populateUser(userData.user);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUser();
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
    populateGame({ game: gameToResume });
    navigate('/game');
  };

  return (
    <div className="container page__container">
      <Navbar auth />
      <img src={backgroundMap} alt="hand drawn world" className="world__icon" />

      <div className="container">
        <button
          type="button"
          onClick={
            !hasGameToResume ? handleSinglePlayerSetup : handleResumeGame
          }
          className="button__primary"
        >
          {hasGameToResume === false ? 'single player' : 'resume game'}
        </button>

        <button
          type="button"
          onClick={handleMultiplayerSetup}
          className="button__primary"
        >
          multi player
        </button>
      </div>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <InitMultiplayer />
      </Modal>
    </div>
  );
};

export default Home;
