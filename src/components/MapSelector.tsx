import React, {
  FunctionComponent, ReactElement,
} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import '../styles/index.css';
import { useMapContext } from '../lib/context/mapContext';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

export interface MapSelectorProps {
}

const MapSelector: FunctionComponent<MapSelectorProps> = (): ReactElement => {
  const {
    viewport, setViewport, pinCoordinates, setPinCoordinates,
  } = useMapContext();

  const dropMarker = ({ lngLat }): void => {
    const longitude = lngLat[0];
    const latitude = lngLat[1];
    setPinCoordinates([longitude, latitude]);
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={dropMarker}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {
          pinCoordinates[0] ? (
            <Marker
              longitude={pinCoordinates[0]}
              latitude={pinCoordinates[1]}
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
