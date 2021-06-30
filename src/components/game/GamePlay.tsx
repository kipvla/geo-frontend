import React, { ReactElement } from 'react';

import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import { useMapContext } from '../../lib/context/mapContext';
import { useGameContext } from '../../lib/context/gameContext';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({
  gameState,
  submitGuess,
}: GamePlayProps): ReactElement => {
  const { pinCoordinates } = useMapContext();
  const { game } = useGameContext();

  return (
    <div>
      <ProgressBar gameState={gameState} />
      {game.locations.length ? (
        <ImageCarousel sources={game.locations[game.currentTurn - 1].images} />
      ) : null}
      <MapSelector />
      <button
        type="button"
        onClick={submitGuess}
        disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
      >
        Make guess
      </button>
    </div>
  );
};

export default GamePlay;
