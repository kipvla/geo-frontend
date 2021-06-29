import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/presentational/Modal';
import GamePlay from '../components/game/GamePlay';
import GameSummary from '../components/game/GameSummary';
import GameScore from '../components/game/GameScore';
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
    addGuess, incrementTurn, game, resetGame,
  } = useGameContext();

  useEffect(() => {
    const test = async () => {
      const response = await apiService.login({ email: 'testuser@gmail.com', password: 'testuser' });
      console.log(response.status);
    };
    test();
  }, []);

  const makeAGuess = () => {
    const [lng, lat] = pinCoordinates;
    const trueLocation = [2, 41];
    const distance = distanceBetweenTwoPoints(
      lng,
      lat,
      trueLocation[0], // change me to game.location[i].lng
      trueLocation[1], // change me to game.location[i].lat
    );
    const score = calculateScore(distance);
    addGuess(lat, lng, distance, score);
    setShowScore(true);
  };

  const startNextRound = () => {
    setShowScore(false);
    incrementTurn();
    resetMap();
    console.log(game);
    if (game.currentTurn === 5) setIsPlaying(false);
  };

  const handleGameEnd = () => {
    setIsPlaying(true);
    resetGame();
  };

  return (
    <div className="game__container">
      Game!
      {
        isPlaying
          ? <GamePlay gameState={game.currentTurn} submitGuess={makeAGuess} />
          : <GameSummary handleGameEnd={handleGameEnd} />
      }

      <Modal show={showScore} handleClose={startNextRound}>
        <GameScore />
      </Modal>

      <Link to="/">To home</Link>
    </div>
  );
};

export default Game;
