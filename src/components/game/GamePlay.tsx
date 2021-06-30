import React, { ReactElement } from 'react';
import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import { useMapContext } from '../../lib/context/mapContext';
import { useGameContext } from '../../lib/context/gameContext';
import '../../styles/index.css';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

// eslint-disable-next-line max-len
const GamePlay: React.FC<GamePlayProps> = ({
  gameState,
  submitGuess,
}: GamePlayProps): ReactElement => {
  const { pinCoordinates } = useMapContext();
  const { game } = useGameContext();

  return (
    <div className="container">
      <ProgressBar gameState={gameState} />
      {game.locations.length ? (
        <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      ) : null}
      <div className="map__selector">
        <MapSelector />
      </div>
      <button
        type="button"
        className="button__primary"
        onClick={submitGuess}
        disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
      >
        Make a guess
      </button>
    </div>
  );
};

export default GamePlay;
