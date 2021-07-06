import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import Modal from '../components/presentational/Modal';
import {
  GamePlay,
  GameSummary,
  GameScore,
  MultiplayerGameSummary,
} from '../components/game';
import { useMapContext, useGameContext } from '../lib/context';
import distanceBetweenTwoPoints from '../lib/scoring/distance';
import calculateScore from '../lib/scoring/score';
import apiService from '../services/apiService';

const Game: React.FC = () => {
  const [showScore, setShowScore] = useState(false);
  const { resetMap, pinCoordinates, setMapToSmall, customViewport } =
    useMapContext();
  const { addGuess, incrementTurn, game, resetGame } = useGameContext();
  if (!game) return null;

  useEffect(() => {
    if (!game.locations.length) navigate('/home');
  }, []);

  const makeAGuess = async () => {
    const [lng, lat] = pinCoordinates;
    const trueLng = game.locations[game.currentTurn - 1].lng;
    const trueLat = game.locations[game.currentTurn - 1].lat;
    const distance = distanceBetweenTwoPoints(lng, lat, trueLng, trueLat);
    const score = calculateScore(distance);
    addGuess(lat, lng, distance, score);
    customViewport(lng - trueLng, lat - trueLat);
    resetMap();
    setMapToSmall();
    setShowScore(true);

    await apiService
      .updateGame({
        gameID: game._id,
        userGuess: { lat, lng, distance, score },
        turnScore: score,
      })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };

  const startNextRound = () => {
    incrementTurn();
    resetMap();
    setShowScore(false);
  };

  const handleGameEnd = () => {
    navigate('/home');
    resetMap();
    resetGame();
  };

  return (
    <div className="container">
      {game.currentTurn <= game.locations.length ? (
        <GamePlay gameState={game.currentTurn} submitGuess={makeAGuess} />
      ) : (
        <>
          {game.multiplayerGameID ? (
            <MultiplayerGameSummary handleGameEnd={handleGameEnd} />
          ) : (
            <GameSummary handleGameEnd={handleGameEnd} />
          )}
        </>
      )}
      <Modal show={showScore}>
        <GameScore />
        <button
          type="button"
          onClick={startNextRound}
          className="button__primary"
        >
          {game.currentTurn === game.locations.length
            ? 'game summary'
            : 'next round'}
        </button>
      </Modal>
    </div>
  );
};

export default Game;
