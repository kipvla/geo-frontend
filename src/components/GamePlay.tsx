import React, { ReactElement } from 'react';
import ProgressBar from './ProgressBar';
import MapSelector from './MapSelector';
import { useMapContext } from '../lib/context/mapContext';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

// eslint-disable-next-line max-len
const GamePlay: React.FC<GamePlayProps> = ({ gameState, submitGuess }: GamePlayProps): ReactElement => {
  const { pinCoordinates } = useMapContext();

  return (

    <div>
      <button
        type="button"
        onClick={submitGuess}
        disabled={pinCoordinates[0] === 0 && pinCoordinates[1] === 0}
      >
        Make guess
      </button>
      <ProgressBar gameState={gameState} />
      <MapSelector />
    </div>

  );
};

export default GamePlay;
