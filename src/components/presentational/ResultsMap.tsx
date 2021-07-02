import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, IconLayer } from '@deck.gl/layers';
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
  const lineData = [{ sourcePosition, targetPosition }];
  const iconData = [
    { coordinates: sourcePosition },
    { coordinates: targetPosition },
  ];

  const ICON_MAPPING = {
    marker: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      anchorY: 128,
    },
  };

  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data: iconData,
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: () => 'marker',
    sizeScale: 7,
    getPosition: (d) => d.coordinates,
    getSize: () => 5,
    getColor: [0, 0, 0],
  });

  const lineLayer = [
    new LineLayer({
      id: 'line-layer',
      data: lineData,
      getWidth: 3,
      getColor: [0, 0, 0],
    }),
  ];

  return (
    <ReactMapGL
      width="40vw"
      height="30vh"
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[iconLayer, lineLayer]}
      >
        <StaticMap
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </ReactMapGL>
  );
};

export default ResultsMap;
