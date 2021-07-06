/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Game } from '../../interfaces';

interface GameContextInterface {
  game: Game;
  addGuess: (lat: number, lng: number, distance: number, score: number) => void;
  incrementTurn: () => void;
  resetGame: () => void;
  populateGame: (gameData: any) => void;
  populateMultiplayerScoreId: (multiplayerId: string) => void;
  multiplayerScoreId: string;
}

const defaultValue = {
  game: null,
  multiplayerScoreId: '',
  addGuess: () => {},
  incrementTurn: () => {},
  resetGame: () => {},
  populateGame: () => {},
  populateMultiplayerScoreId: () => {},
};

const initialGameState: Game = {
  active: true,
  currentScore: 0,
  locations: [],
  currentTurn: 0,
  guesses: [],
  _id: '',
  userID: '',
  createdAt: '',
  updatedAt: '',
};

export const GameContext =
  React.createContext<GameContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const GameProvider = ({ children }): any => {
  const [game, setGame] = useState<Game>(initialGameState);
  const [multiplayerScoreId, setMultiplayerScoreId] = useState('');

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
      currentScore: oldGame.currentScore + score,
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

  const populateMultiplayerScoreId = (multiplayerId: string) => {
    console.log(multiplayerId, 'from context');
    setMultiplayerScoreId(multiplayerId);
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
      ...data,
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
        populateMultiplayerScoreId,
        multiplayerScoreId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
