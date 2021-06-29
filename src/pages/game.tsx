import React, { useState, useEffect } from 'react';
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
      await apiService.login({ email: 'testuser@gmail.com', password: 'testuser' })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('accessToken', res.token);
        });

      const GAME = await apiService.fetchGame().then((res) => res.json());
      console.log(GAME);
    };
    test();
  }, []);

  const makeAGuess = () => {
    const [lng, lat] = pinCoordinates;
    const trueLocation = [2, 41]; // change me to game.location[currentTurn-1]
    const distance = distanceBetweenTwoPoints(
      lng,
      lat,
      trueLocation[0],
      trueLocation[1],
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
    if (game.currentTurn === 3) setIsPlaying(false);
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
    </div>
  );
};

export default Game;
