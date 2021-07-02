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
  // const [mapDraggingBounds, setMapDraggingBounds] = useState(-1015);
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

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('resize', () =>
  //       setMapDraggingBounds((window.innerWidth - 265) * -1)
  //     );
  //   }
  // });

  return (
    <div className="container page__container" style={{ flexDirection: 'row' }}>
      <Navbar auth />
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      {isMapModal ? (
        <Modal show handleClose={minimizeMap}>
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
          className="map__selector"
        >
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
          open map
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
