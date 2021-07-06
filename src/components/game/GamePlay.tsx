import React from 'react';
import { GrClose } from 'react-icons/gr';
import { CgArrowsExpandLeft } from 'react-icons/cg';
import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import Navbar from '../presentational/Navbar';
import { useMapContext, useGameContext } from '../../lib/context';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ gameState, submitGuess }) => {
  const { pinCoordinates, mapDimensions, setMapToLarge, setMapToSmall } =
    useMapContext();
  const { game } = useGameContext();
  if (!game.locations.length) return null;

  const toggleMapSize = () => {
    if (mapDimensions.width === '52rem') {
      setMapToSmall();
    } else {
      setMapToLarge();
    }
  };

  return (
    <div className="container page__container game">
      <Navbar auth />
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />

      <div
        className={`map__selector ${
          mapDimensions.width === '52rem' ? 'map__md' : 'map__sm'
        }`}
      >
        {mapDimensions.height === '10rem' ? (
          <button
            className="map__toggle map__arrows"
            type="button"
            onClick={toggleMapSize}
          >
            <CgArrowsExpandLeft />
          </button>
        ) : (
          <>
            <button
              className="map__toggle"
              type="button"
              onClick={toggleMapSize}
            >
              <GrClose />
            </button>
            <button
              type="button"
              className="button__primary map__guess"
              onClick={submitGuess}
              disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
            >
              place guess
            </button>
          </>
        )}
        <MapSelector />
      </div>
    </div>
  );
};

export default GamePlay;
