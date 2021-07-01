import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  const minimizeMap = () => {
    setViewport({
      width: '20vw',
      height: '20vh',
      latitude: 22,
      longitude: -65,
      zoom: 0.6,
    });
    setIsMapModal(false);
  };

  return (
    <div className="container page__container" style={{ flexDirection: 'row' }}>
      <Navbar auth />
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      {isMapModal ? (
        <Modal show handleClose={minimizeMap}>
          <button
            type="button"
            className="button__primary"
            onClick={minimizeMap}
          >
            minimize map
          </button>
          <MapSelector />
        </Modal>
      ) : (
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: -1015,
            right: 0,
            bottom: 0,
          }}
          className="map__selector"
        >
          <MapSelector />
        </motion.div>
      )}
      <div className="game__right">
        <button
          type="button"
          className="button__primary"
          onClick={submitGuess}
          disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
        >
          make guess
        </button>
        <button type="button" className="button__primary" onClick={expandMap}>
          expand map
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
