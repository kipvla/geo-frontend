import React from 'react';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => (
  <div>
    <p>its me the end of game screen!</p>
    <button type="button" onClick={handleGameEnd}>
      take me home
    </button>
  </div>
);

export default GameSummary;
