import React, { useState } from 'react';
import { Link } from 'gatsby';
import Modal from '../components/presentational/Modal';
import GamePlay from '../components/game/GamePlay';
import GameSummary from '../components/game/GameSummary';
import GameScore from '../components/game/GameScore';
import { useMapContext } from '../lib/context/mapContext';
import { useGameContext } from '../lib/context/gameContext';

const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const { resetMap, pinCoordinates } = useMapContext();
  const {
    addGuess, incrementTurn, game, resetGame,
  } = useGameContext();

  const makeAGuess = () => {
    const [lng, lat] = pinCoordinates;
    addGuess(lat, lng);
    setShowScore(true);
  };

  const startNextRound = () => {
    console.log(game);
    setShowScore(false);
    incrementTurn();
    resetMap();
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
