import React, { ReactElement } from 'react';
import ProgressBar from '../presentational/ProgressBar';
import MapSelector from './MapSelector';
import ImageCarousel from './ImageCarousel';
import { useMapContext } from '../../lib/context/mapContext';

export interface GamePlayProps {
  gameState: number;
  submitGuess: () => void;
}

const sources = [
  'https://images.unsplash.com/photo-1588426651288-7e828a77f413?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8RnpvM3p1T0hONnd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1566241619114-948b5a7df53c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8RnpvM3p1T0hONnd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1624751893756-24d68bf11d0c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1624750324738-4c1a1fc781dc?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1624561500830-5bf95d797d93?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
];

// eslint-disable-next-line max-len
const GamePlay: React.FC<GamePlayProps> = ({ gameState, submitGuess }: GamePlayProps): ReactElement => {
  const { pinCoordinates } = useMapContext();

  return (

    <div>
      <ProgressBar gameState={gameState} />
      <ImageCarousel sources={sources} />
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
