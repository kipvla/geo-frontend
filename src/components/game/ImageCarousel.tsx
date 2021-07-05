import React from 'react';
// import Magnifier from 'react-magnifier';

export interface ImageCarouselProps {
  sources: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }) => (
  <div className="carousel">
    {sources.map((source, ind) => (
      <div className="carousel__button">
        {/* <Magnifier
          key={ind.toString()}
          src={source}
          zoomFactor={1.3}
          mgWidth={250}
          mgHeight={250}
          height="100%"
          width="auto"
        /> */}
        <img key={ind.toString()} src={source} alt={source} />
      </div>
    ))}
  </div>
);

export default ImageCarousel;
