import React, { useState, useEffect } from 'react';
import Modal from '../components/presentational/Modal';
import GamePlay from '../components/game/GamePlay';
import GameSummary from '../components/game/GameSummary';
import GameScore from '../components/game/GameScore';
import Navbar from '../components/presentational/Navbar';
import { useMapContext } from '../lib/context/mapContext';
import { useGameContext } from '../lib/context/gameContext';
import distanceBetweenTwoPoints from '../lib/scoring/distance';
import calculateScore from '../lib/scoring/score';
import apiService from '../services/apiService';

const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const { resetMap, pinCoordinates } = useMapContext();

  const {
    addGuess,
    incrementTurn,
    game,
    resetGame,
    populateGame,
  } = useGameContext();

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await apiService.fetchGame().then((res) => res.json());
      populateGame(gameData);
    };
    fetchGame();
  }, []);

  const makeAGuess = () => {
    const [lng, lat] = pinCoordinates;
    const trueLng = game.locations[game.currentTurn - 1].lng;
    const trueLat = game.locations[game.currentTurn - 1].lat;
    const distance = distanceBetweenTwoPoints(lng, lat, trueLng, trueLat);
    const score = calculateScore(distance);
    addGuess(lat, lng, distance, score);
    setShowScore(true);
  };

  const startNextRound = () => {
    setShowScore(false);
    incrementTurn();
    resetMap();
    if (game.currentTurn === 3) setIsPlaying(false);
  };

  const handleGameEnd = () => {
    setIsPlaying(true);
    resetGame();
  };

  return (
    <div className="container">
      <Navbar auth />
      {isPlaying ? (
        <GamePlay gameState={game.currentTurn} submitGuess={makeAGuess} />
      ) : (
        <GameSummary handleGameEnd={handleGameEnd} />
      )}
      <Modal show={showScore} handleClose={startNextRound}>
        <GameScore />
      </Modal>
    </div>
  );
};

export default Game;
