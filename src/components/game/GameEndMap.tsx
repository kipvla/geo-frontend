import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, IconLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import { useGameContext } from '../../lib/context/gameContext';

const INITIAL_VIEW_STATE = {
  longitude: -40.41669,
  latitude: 37.7853,
  zoom: 0.5,
  pitch: 0,
  bearing: 0,
};

const GameEndMap: React.FC = () => {
  const { game } = useGameContext();

  const getPinPositions = (index: number) => {
    const guessLng = game.guesses[index].lng;
    const guessLat = game.guesses[index].lat;

    const targetLng = game.locations[index].lng;
    const targetLat = game.locations[index].lat;

    return {
      sourcePosition: [guessLng, guessLat],
      targetPosition: [targetLng, targetLat],
    };
  };

  const lineData = game.locations.map((_, locationIndex) =>
    getPinPositions(locationIndex)
  );

  const sourceLocations = game.locations.map(({ lng, lat }) => ({
    coordinates: [lng, lat],
  }));

  const targetLocations = game.guesses.map(({ lng, lat }) => ({
    coordinates: [lng, lat],
  }));

  const iconData = sourceLocations.concat(targetLocations);

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
    <div>
      <div>
        <DeckGL
          width="60vw"
          height="50vh"
          initialViewState={INITIAL_VIEW_STATE}
          controller
          layers={[iconLayer, lineLayer]}
        >
          <StaticMap
            mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
      <p style={{ color: 'black' }}>{`POINTS: ${game.currentScore}`}</p>
    </div>
  );
};

export default GameEndMap;
