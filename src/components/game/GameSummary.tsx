import React from 'react';
import '../../styles/index.css';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => (
  <div>
    <p className="text__light">its me the end of game screen!</p>
    <button type="button" onClick={handleGameEnd}>
      take me home
    </button>
  </div>
);

export default GameSummary;
