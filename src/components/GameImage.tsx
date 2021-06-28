import React, { FunctionComponent, ReactElement } from 'react';

export interface GameImageProps {
  source: string;
}

// eslint-disable-next-line max-len
const GameImage: FunctionComponent<GameImageProps> = ({ source }: GameImageProps): ReactElement => (
  <img src={source} alt={source} />
);

export default GameImage;
