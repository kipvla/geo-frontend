import React, { FunctionComponent, ReactElement } from 'react';

export interface ProgressBarProps {
  gameState: number;
}

// eslint-disable-next-line max-len
const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  gameState,
}: ProgressBarProps): ReactElement => (
  <div className="progress">
    <div
      className="progress-bar"
      style={{ width: `${((gameState - 1) * 100) / 3}%` }}
    />
  </div>
);

export default ProgressBar;
