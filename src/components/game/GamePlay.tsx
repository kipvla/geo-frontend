import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import { CgArrowsExpandLeft } from 'react-icons/cg';
import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import Navbar from '../presentational/Navbar';
import { useMapContext } from '../../lib/context/mapContext';
import { useGameContext } from '../../lib/context/gameContext';
import Modal from '../presentational/Modal';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ gameState, submitGuess }) => {
  const { pinCoordinates, setViewport } = useMapContext();
  const { game } = useGameContext();
  const [isMapModal, setIsMapModal] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({
    width: '100px',
    height: '100px',
  });
  if (!game.locations.length) return null;

  const expandMap = () => {
    setViewport({
      width: '80vw',
      height: '80vh',
      latitude: 22,
      longitude: -65,
      zoom: 0.6,
    });
    setIsMapModal(true);
  };

  const toggleMapSize = () => {
    console.log(isMapModal, mapDimensions.width);
    if (mapDimensions.width === '520px' || isMapModal) {
      setMapDimensions({ width: '100px', height: '100px' });
      setViewport({
        width: '100px',
        height: '100px',
        latitude: 22,
        longitude: -65,
        zoom: 0.6,
      });
    } else {
      setMapDimensions({ width: '520px', height: '300px' });
      setViewport({
        width: '520px',
        height: '300px',
        latitude: 22,
        longitude: -65,
        zoom: 0.6,
      });
    }
    setIsMapModal(false);
  };

  return (
    <div className="container page__container game">
      <Navbar auth />
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      {isMapModal ? (
        <Modal show handleClose={toggleMapSize}>
          <MapSelector />
        </Modal>
      ) : (
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          className={`map__selector ${
            mapDimensions.width === '520px' ? 'map__md' : 'map__sm'
          }`}
        >
          {mapDimensions.height === '100px' ? (
            <button
              className="map__toggle"
              type="button"
              onClick={toggleMapSize}
            >
              <CgArrowsExpandLeft />
            </button>
          ) : (
            <button
              className="map__toggle"
              type="button"
              onClick={toggleMapSize}
            >
              <GrClose />
            </button>
          )}
          <MapSelector />
        </motion.div>
      )}
      <div className="game__side__container">
        <button
          type="button"
          className="button__primary"
          onClick={submitGuess}
          disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
        >
          place guess
        </button>
        <button type="button" className="button__primary" onClick={expandMap}>
          full map
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
