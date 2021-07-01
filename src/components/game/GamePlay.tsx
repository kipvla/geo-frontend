import React from 'react';
import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import Navbar from '../presentational/Navbar';
import { useMapContext } from '../../lib/context/mapContext';
import { useGameContext } from '../../lib/context/gameContext';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ gameState, submitGuess }) => {
  const { pinCoordinates } = useMapContext();
  const { game } = useGameContext();
  if (!game.locations.length) return null;

  return (
    <div className="container page__container" style={{ flexDirection: 'row' }}>
      <Navbar auth />
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      <div className="map__selector">
        <MapSelector />
      </div>
      <div className="game__right">
        <button
          type="button"
          className="button__primary"
          onClick={submitGuess}
          disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
        >
          Make a guess
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
