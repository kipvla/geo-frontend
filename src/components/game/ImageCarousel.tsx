import React, { useEffect, useState } from 'react';

export interface ImageCarouselProps {
  sources: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }) => {
  const [mainImg, setMainImg] = useState(sources[0]);
  if (!sources.length) return null;

  const changeImg = ({ target }) => {
    setMainImg(target.src);
  };

  useEffect(() => {
    setMainImg(sources[0]);
  }, [sources]);

  return (
    <div className="carousel">
      {sources.map((source, ind) =>
        source !== mainImg ? (
          <button
            key={ind.toString()}
            type="button"
            onClick={changeImg}
            className="carousel__button"
          >
            <img src={source} alt={source} />
          </button>
        ) : (
          <img
            key={ind.toString()}
            src={source}
            alt={source}
            className="main__img"
          />
        )
      )}
    </div>
  );
};

export default ImageCarousel;
