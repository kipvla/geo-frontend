import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import Modal from '../components/presentational/Modal';
import { GamePlay, GameSummary, GameScore } from '../components/game';
import { useMapContext } from '../lib/context/mapContext';
import { useGameContext } from '../lib/context/gameContext';
import distanceBetweenTwoPoints from '../lib/scoring/distance';
import calculateScore from '../lib/scoring/score';
import apiService from '../services/apiService';

const Game: React.FC = () => {
  const [showScore, setShowScore] = useState(false);
  const { resetMap, pinCoordinates } = useMapContext();
  const { addGuess, incrementTurn, game, resetGame, populateGame } =
    useGameContext();
  if (!game) return null;

  const fetchGame = async () => {
    await apiService
      .fetchGame()
      .then((res) => res.json())
      .then((gameData) => populateGame(gameData))
      .catch(() => navigate('/'));
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const makeAGuess = async () => {
    const [lng, lat] = pinCoordinates;
    const trueLng = game.locations[game.currentTurn - 1].lng;
    const trueLat = game.locations[game.currentTurn - 1].lat;
    const distance = distanceBetweenTwoPoints(lng, lat, trueLng, trueLat);
    const score = calculateScore(distance);
    addGuess(lat, lng, distance, score);
    setShowScore(true);

    const response = await apiService
      .updateGame({
        gameID: game.id,
        userGuess: { lat, lng, distance, score },
        turnScore: score,
      })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    console.log(response);
  };

  const startNextRound = () => {
    setShowScore(false);
    incrementTurn();
    resetMap();
  };

  const handleGameEnd = () => {
    navigate('/home');
    resetGame();
  };

  return (
    <div className="container">
      {game.currentTurn <= 3 ? (
        <GamePlay gameState={game.currentTurn} submitGuess={makeAGuess} />
      ) : (
        <GameSummary handleGameEnd={handleGameEnd} />
      )}
      <Modal show={showScore} handleClose={startNextRound}>
        <GameScore />
        <button
          type="button"
          onClick={startNextRound}
          className="button__primary"
        >
          next round
        </button>
      </Modal>
    </div>
  );
};

export default Game;
