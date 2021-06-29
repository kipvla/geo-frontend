import React, { ReactNode } from 'react';
import ReactMapGL from 'react-map-gl';
// import { GeoJSON } from 'geojson';
// import Layer and Source from react-map-gl

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

export interface StaticMapProps {
 children: ReactNode
}

// const polygon1: GeoJSON = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         type: 'LineString',
//         coordinates: [
//           [3.989067077636719, 51.10384530764609],
//           [3.994474411010742, 51.10414172379734],
//         ],
//       },
//     },
//   ],
// };

const StaticMap: React.FC<StaticMapProps> = ({ children }: StaticMapProps) => (
  <ReactMapGL
    width="40vw"
    height="30vh"
    mapStyle="mapbox://styles/mapbox/outdoors-v11"
    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
  >
    {children}
    { /* <Source type="geojson" data={polygon1}>
          <Layer
            id="data"
            type="line"
            paint={{
              'fill-color': '#000',
              'fill-opacity': 1,
              'fill-outline-color': '#000',
            }}
          />
        </Source> */ }
  </ReactMapGL>
);

export default StaticMap;
