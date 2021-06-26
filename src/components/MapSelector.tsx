import React, { FunctionComponent, ReactElement, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import '../styles/index.css';

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

  const handleClick = (event): void => {
    console.log(event.lngLat);
  };

  return (
    <div>
      <p>I am about to be a map!</p>
      <ReactMapGL
        width={map.viewport.width}
        height={map.viewport.height}
        latitude={map.viewport.latitude}
        longitude={map.viewport.longitude}
        zoom={map.viewport.zoom}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(viewport) => setMap({ viewport })}
        onClick={handleClick}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <Marker
          longitude={-123.33}
          latitude={42.43}
          className="map__marker"
        />
      </ReactMapGL>

    </div>
  );
};

export default MapSelector;
