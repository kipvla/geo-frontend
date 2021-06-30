import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import ReactMapGL, { StaticMap, Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { useGameContext } from '../../lib/context/gameContext';

const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -40.41669,
  latitude: 37.7853,
  zoom: 0.5,
  pitch: 0,
  bearing: 0,
};

const GameEndMap: React.FC = () => {
  const { game } = useGameContext();

  let index = 0;
  let sourcePosition: [number, number] = [0, 0];
  let targetPosition: [number, number] = [0, 0];

  if (game.guesses.length) {
    index = game.guesses.length - 1;

    const guessLng = game.guesses[index].lng;
    const guessLat = game.guesses[index].lat;
    sourcePosition = [guessLng, guessLat];

    const targetLng = game.locations[index].lng;
    const targetLat = game.locations[index].lat;
    targetPosition = [targetLng, targetLat];
    console.log('TARGET', targetPosition);
    console.log('SOURCE', sourcePosition);
  }
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

  const data = game.locations.map((_, locationIndex) =>
    getPinPositions(locationIndex)
  );
  console.log(data);

  const layers = [new LineLayer({ id: 'line-layer', data })];

  return (
    <>
      <ReactMapGL
        width="40vw"
        height="30vh"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller
          layers={layers}
        >
          <StaticMap
            mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </ReactMapGL>
      <p>{`DISTANCE: ${game.guesses[index].distance} km`}</p>
      <p>{`POINTS: ${game.guesses[index].score}`}</p>
    </>
  );
};

export default GameEndMap;
