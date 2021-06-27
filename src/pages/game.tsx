import React, { useState } from 'react';
import { Link } from 'gatsby';
import GameScreen from '../components/GameScreen';
import { useMapContext } from '../lib/context/mapContext';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const { setZoomLevel, setPinCoordinates } = useMapContext();

  const handleClick = () => {
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
          ? (
            <GameScreen gameState={gameState} handleClick={handleClick} />
          )
          : (
            <button type="button" onClick={handleGameEnd}>
              Play again
            </button>
          )
      }
      <Link to="/">To home</Link>
    </div>
  );
};

export default Game;
