import React, { FunctionComponent, ReactElement } from 'react';
import ProgressBar from './ProgressBar';
import MapSelector from '../components/MapSelector';

export interface GameScreenProps {
  gameState: number;
  handleClick: () => void;
}

// eslint-disable-next-line max-len
const GameScreen: FunctionComponent<GameScreenProps> = ({ gameState, handleClick }: GameScreenProps): ReactElement => (
  <div>
    <button type="button" onClick={handleClick}>
      Make guess
    </button>
    <ProgressBar gameState={gameState} />
    <MapSelector />
  </div>
);

export default GameScreen;
