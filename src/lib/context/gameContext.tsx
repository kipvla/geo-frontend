/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Game, UserGuess, Location } from '../../interfaces';

interface GameContextInterface {
  game: Game;
  addGuess: (lat: number, lng: number, distance: number, score: number) => void;
  incrementTurn: () => void;
  resetGame: () => void;
}

const initialGameState: Game = {
  id: '',
  guesses: [],
  locations: [],
  currentTurn: 1, // change back to 0 when backend is connected
  createdAt: '',
  updatedAt: '',
};

export const GameContext = React.createContext<GameContextInterface>(null);

// eslint-disable-next-line react/prop-types
export const GameProvider = ({ children }): any => {
  const [game, setGame] = useState<Game>(initialGameState);

  const addGuess = (lat: number, lng: number, distance: number, score: number) => {
    setGame((oldGame) => ({
      ...oldGame,
      guesses: oldGame.guesses.concat({
        lat, lng, distance, score,
      }),
    }));
  };

  const incrementTurn = () => {
    setGame((oldGame) => ({
      ...oldGame,
      currentTurn: oldGame.currentTurn + 1,
    }));
  };

  const resetGame = () => {
    setGame(initialGameState);
  };

  return (
    <GameContext.Provider value={{
      game, addGuess, incrementTurn, resetGame,
    }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
