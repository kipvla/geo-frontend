import React from 'react';
import GameEndMap from './GameEndMap';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => (
  <div>
    <p>its me the end of game screen!</p>
    <GameEndMap />
    <button type="button" onClick={handleGameEnd}>
      Play again
    </button>
  </div>
);

export default GameSummary;
