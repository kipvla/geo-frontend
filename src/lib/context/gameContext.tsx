/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Game } from '../../interfaces';

interface GameContextInterface {
  game: Game;
  addGuess: (lat: number, lng: number, distance: number, score: number) => void;
  incrementTurn: () => void;
  resetGame: () => void;
  populateGame: (gameData: any) => void;
}

const initialGameState: Game = {
  id: '',
  guesses: [],
  locations: [],
  currentTurn: 0,
  createdAt: '',
  updatedAt: '',
};

export const GameContext = React.createContext<GameContextInterface>(null);

// eslint-disable-next-line react/prop-types
export const GameProvider = ({ children }): any => {
  const [game, setGame] = useState<Game>(initialGameState);

  const addGuess = (
    lat: number,
    lng: number,
    distance: number,
    score: number
  ) => {
    setGame((oldGame) => ({
      ...oldGame,
      guesses: oldGame.guesses.concat({
        lat,
        lng,
        distance,
        score,
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

  const populateGame = (gameData: any) => {
    const data = gameData.game;

    const formattedLocations = data.locations.map((loc) => ({
      images: loc.images,
      lat: parseFloat(loc.latitude),
      lng: parseFloat(loc.longitude),
      title: loc.title,
    }));

    setGame({
      id: data._id,
      currentTurn: data.currentTurn,
      guesses: data.guesses,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      locations: formattedLocations,
    });
  };

  return (
    <GameContext.Provider
      value={{
        game,
        addGuess,
        incrementTurn,
        resetGame,
        populateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
