import React, {
  FunctionComponent, ReactElement, useState, useContext,
} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { GameContext } from '../lib/context/gameContext';

import '../styles/index.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

export interface MapSelectorProps {
}

// const initialMapState = {
//   viewport: {
//     width: '50vw',
//     height: '50vh',
//     latitude: 22,
//     longitude: -65,
//     zoom: 0.6,
//   },
// };

const MapSelector: FunctionComponent<MapSelectorProps> = (): ReactElement => {
  // const [map, setMap] = useState(initialMapState);
  const { map, setMap } = useContext(GameContext);
  const [coordinates, setCoordinates] = useState([0, 0]);

  const dropMarker = (event): void => {
    const longitude = event.lngLat[0];
    const latitude = event.lngLat[1];
    if (longitude && latitude) {
      setCoordinates([longitude, latitude]);
    }
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
        onViewportChange={(viewport) => {
          setMap({ viewport });
          console.log(viewport);
        }}
        onClick={dropMarker}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          coordinates[0] ? (
            <Marker
              longitude={coordinates[0]}
              latitude={coordinates[1]}
              draggable
              onDragEnd={dropMarker}
            >
              <FaMapPin />
            </Marker>
          )
            : null
        }
      </ReactMapGL>

    </div>
  );
};

export default MapSelector;
