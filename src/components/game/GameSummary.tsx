import React from 'react';
import GameEndMap from './GameEndMap';
import '../../styles/index.css';

export interface GameSummaryProps {
  handleGameEnd: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  handleGameEnd,
}: GameSummaryProps) => (
  <div>
    <p className="text__light">its me the end of game screen!</p>
    <GameEndMap />
    <button type="button" onClick={handleGameEnd}>
      take me home
    </button>
  </div>
);

export default GameSummary;
