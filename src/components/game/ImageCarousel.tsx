import React, { useEffect, useState } from 'react';
import Magnifier from 'react-magnifier';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export interface ImageCarouselProps {
  sources: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ sources }) => (
  <div className="carousel">
    <Carousel plugins={['rtl', 'arrows']}>
      {sources.map((source, ind) => (
        <div className="carousel__button">
          <Magnifier
            key={ind.toString()}
            src={source}
            zoomFactor={1.3}
            mgWidth={250}
            mgHeight={250}
          />
        </div>
      ))}
    </Carousel>
  </div>
);

export default ImageCarousel;
