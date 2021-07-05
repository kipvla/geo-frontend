import React, { FunctionComponent, ReactElement } from 'react';
import { FiGlobe } from 'react-icons/fi';

export interface ProgressBarProps {
  gameState: number;
}

// eslint-disable-next-line max-len
const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  gameState,
}: ProgressBarProps): ReactElement => (
  <>
    <div className="container game__side__container desktop">
      <div className="progress desktop">
        <div
          className="progress-bar"
          style={{ height: `${((gameState - 1) * 100) / 3}%` }}
        />
        <FiGlobe className="progress__globe" />
      </div>
    </div>
    <div className="container mobile">
      <div className="progress progress__mobile">
        <div
          className="progress-bar"
          style={{ width: `${((gameState - 1) * 100) / 3}%` }}
        />
        <FiGlobe className="progress__globe" />
      </div>
    </div>
  </>
);

export default ProgressBar;
