import React, { FunctionComponent, ReactElement, useState } from 'react';

import ReactMapGL from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

export interface MapSelectorProps {

}

const initialMapState = {
  viewport: {
    width: '50vw',
    height: '50vh',
    latitude: 42.430472,
    longitude: -123.334102,
    zoom: 16,
  },
};

const MapSelector: FunctionComponent<MapSelectorProps> = (): ReactElement => {
  const [map, setMap] = useState(initialMapState);

  return (
    <div>
      <p>I am about to be a map!</p>
      <ReactMapGL
        {...map.viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(viewport) => setMap({ viewport })}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </div>
  );
};

export default MapSelector;
