import React, { ReactElement, useState } from 'react';

export interface ImageCarouselProps {
  sources: string[];
}

// eslint-disable-next-line max-len
const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }: ImageCarouselProps): ReactElement => {
  const [mainImg, setMainImg] = useState(sources[0]);

  const changeImg = (event) => {
    setMainImg(event.target.src);
  };

  return (
    <div className="carousel">
      {sources.map((source, ind) => (
        source !== mainImg
          ? <button key={ind.toString()} type="button" onClick={changeImg}><img src={source} alt={source} /></button>
          : <img key={ind.toString()} src={source} alt={source} id="img-main" />
      )) }
    </div>
  );
};

export default ImageCarousel;
