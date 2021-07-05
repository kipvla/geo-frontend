import React from 'react';
// import Magnifier from 'react-magnifier';

export interface ImageCarouselProps {
  sources: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }) => (
  <div className="carousel">
    <div className="slider">
      <div className="slides">
        {sources.map((source, ind) => (
          <div
            id={`slide-${ind + 1}`}
            style={{ backgroundImage: `url(${source})` }}
          >
            {/* <Magnifier
              key={ind.toString()}
              src={source}
              zoomFactor={1.3}
              mgWidth={250}
              mgHeight={250}
              height="100%"
              width="auto"
            /> */}
            {/* <img key={ind.toString()} src={source} alt={source} /> */}
          </div>
        ))}
      </div>
    </div>
    <div className="thumbnails">
      {sources.map((source, ind) => (
        <a
          href={`#slide-${ind + 1}`}
          style={{ backgroundImage: `url(${source})` }}
        >
          {}
        </a>
      ))}
    </div>
  </div>
);

export default ImageCarousel;
