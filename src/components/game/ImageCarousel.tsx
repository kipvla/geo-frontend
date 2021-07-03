import React, { useEffect, useState } from 'react';
import Magnifier from 'react-magnifier';

export interface ImageCarouselProps {
  sources: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }) => {
  const [mainImg, setMainImg] = useState(sources[0]);
  if (!sources.length) return null;

  const changeImg = ({ target }) => {
    setMainImg(target.src);
  };

  const updateMainImg = (e) => {
    console.log(e);
  };

  useEffect(() => {
    setMainImg(sources[0]);
  }, [sources]);

  useEffect(() => {
    document
      .getElementsByClassName('carousel')[0]
      .addEventListener('scroll', updateMainImg);
  });

  return (
    <div className="carousel">
      {sources.map((source, ind) =>
        source !== mainImg ? (
          <div className="">
            <button
              key={ind.toString()}
              type="button"
              onClick={changeImg}
              className="carousel__button"
            >
              Next
            </button>
            <Magnifier
              src={source}
              zoomFactor={1.3}
              mgWidth={250}
              mgHeight={250}
            />
          </div>
        ) : (
          <Magnifier
            key={ind.toString()}
            src={source}
            zoomFactor={1.3}
            mgWidth={250}
            mgHeight={250}
          />
        )
      )}
    </div>
  );
};

export default ImageCarousel;
