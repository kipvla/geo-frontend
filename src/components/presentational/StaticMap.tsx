import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import ReactMapGL, { StaticMap } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

export interface ResultsMapProps {
  sourcePosition: [number, number];
  targetPosition: [number, number];
}

const INITIAL_VIEW_STATE = {
  longitude: -40.41669,
  latitude: 37.7853,
  zoom: 2,
  pitch: 0,
  bearing: 0,
};

const ResultsMap: React.FC<ResultsMapProps> = ({
  sourcePosition,
  targetPosition,
}: ResultsMapProps) => {
  const data = [{ sourcePosition, targetPosition }];

  const layers = [new LineLayer({ id: 'line-layer', data })];

  return (
    <ReactMapGL
      width="40vw"
      height="30vh"
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
        <StaticMap
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </ReactMapGL>
  );
};

export default ResultsMap;
