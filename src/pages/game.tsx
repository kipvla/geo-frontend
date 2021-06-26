import React, { useState } from 'react';
import { Link } from 'gatsby';
import GameScreen from '../components/GameScreen';

// start button from home screen -> game component
// keep track of state of game within game component
// guess button within game component -> end of turn screen
// update game state
// when game ends -> end screen

export default function game() {
  const [gameState, setGameState] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClick = () => {
    setGameState(gameState + 1);
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
}
