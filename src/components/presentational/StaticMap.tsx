import React, { ReactNode } from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

export interface StaticMapProps {
 children: ReactNode
}

const StaticMap: React.FC<StaticMapProps> = ({ children }: StaticMapProps) => (
  <ReactMapGL
    width="40vw"
    height="30vh"
    mapStyle="mapbox://styles/mapbox/outdoors-v11"
    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
  >
    {children}
  </ReactMapGL>
);

export default StaticMap;
