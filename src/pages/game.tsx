import React, { useState } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/Modal';
import GamePlay from '../components/GamePlay';
import GameSummary from '../components/GameSummary';
import { useMapContext } from '../lib/context/mapContext';
import GameScore from '../components/GameScore';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const { setZoomLevel, setPinCoordinates, pinCoordinates } = useMapContext();
  const guesses: number[][] = [];

  const makeAGuess = () => {
    guesses.push(pinCoordinates);
    console.log(pinCoordinates);
    setShowScore(true);
  };

  const startNextRound = () => {
    setShowScore(false);
    setGameState(gameState + 1);
    setZoomLevel(0.4);
    setPinCoordinates([0, 0]);
    if (gameState === 5) setIsPlaying(false);
  };

  const handleGameEnd = () => {
    setIsPlaying(true);
    setGameState(1);
  };

  return (
    <div>
      Game!
      {
        isPlaying
          ? <GamePlay gameState={gameState} submitGuess={makeAGuess} />
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
