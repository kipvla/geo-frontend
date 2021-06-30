import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import ReactMapGL, { StaticMap, Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { useGameContext } from '../../lib/context/gameContext';
import '../../styles/index.css';

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

  const markers = React.useMemo(
    () =>
      data.map(({ sourcePosition, targetPosition }) => (
        <>
          <Marker
            key={sourcePosition[0]}
            longitude={sourcePosition[0]}
            latitude={sourcePosition[1]}
            draggable
          >
            <FaMapPin />
          </Marker>
          <Marker
            key={targetPosition[0]}
            longitude={targetPosition[0]}
            latitude={targetPosition[1]}
            draggable
          >
            <FaMapPin />
          </Marker>
        </>
      )),
    [game]
  );

  const layers = [new LineLayer({ id: 'line-layer', data })];
  const lines = React.useMemo(
    () => (
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
        <StaticMap
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    ),
    [game]
  );
  return (
    <>
      <ReactMapGL
        width="60vw"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {lines}
        {markers}
      </ReactMapGL>
      <p style={{ color: 'white' }}>{`POINTS: ${game.currentScore}`}</p>
    </>
  );
};

export default GameEndMap;
