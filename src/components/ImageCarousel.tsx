import React, { FunctionComponent, ReactElement, useState } from 'react';

export interface GameImageProps {
  sources: string[];
}

// eslint-disable-next-line max-len
const GameImage: FunctionComponent<GameImageProps> = ({ sources }: GameImageProps): ReactElement => {
  const [mainImg, setMainImg] = useState(sources[0]);

  const changeImg = (event) => {
    setMainImg(event.target.src);
  };

  return (
    <div className="carousel">
      {sources.map((source) => (source !== mainImg
        ? <button type="button" onClick={changeImg}><img src={source} alt={source} /></button>
        : <img src={source} alt={source} id="img-main" />
      )) }
    </div>
  );
};

export default GameImage;
