import React, { FunctionComponent, ReactElement } from 'react';
import { FiGlobe } from 'react-icons/fi';

export interface ProgressBarProps {
  gameState: number;
}

// eslint-disable-next-line max-len
const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  gameState,
}: ProgressBarProps): ReactElement => (
  <div className="container game__side__container">
    <div className="progress">
      <div
        className="progress-bar"
        style={{ height: `${((gameState - 1) * 100) / 3}%` }}
      />
      <FiGlobe className="progress__globe" />
    </div>
  </div>
);

export default ProgressBar;
