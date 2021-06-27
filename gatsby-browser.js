import React from 'react';
import { MapProvider } from './src/lib/context/mapContext';

export const wrapRootElement = ({ element }) => (

  <MapProvider>
    {element}
  </MapProvider>
);

export default wrapRootElement;
