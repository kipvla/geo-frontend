import React from 'react';
import GameEndMap from './GameEndMap';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <GameEndMap />
    <button type="button" onClick={handleGameEnd}>
      take me home
    </button>
  </div>
);

export default GameSummary;
