import React, { useState } from 'react';

import { GrClose } from 'react-icons/gr';
import { CgArrowsExpandLeft } from 'react-icons/cg';

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
  const { pinCoordinates, setViewport } = useMapContext();
  const { game } = useGameContext();
  const [mapDimensions, setMapDimensions] = useState({
    width: '10rem',
    height: '10rem',
  });
  if (!game.locations.length) return null;

  const toggleMapSize = () => {
    if (mapDimensions.width === '52rem') {
      setMapDimensions({ width: '10rem', height: '10rem' });
      setViewport({
        width: '100%',
        height: '100%',
        latitude: pinCoordinates[0],
        longitude: pinCoordinates[1],
        zoom: 2,
        altitude: 1,
      });
    } else {
      setMapDimensions({ width: '52rem', height: '30rem' });
      setViewport({
        width: '100%',
        height: '100%',
        latitude: pinCoordinates[0],
        longitude: pinCoordinates[1],
        zoom: 1,
        altitude: 1,
      });
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
