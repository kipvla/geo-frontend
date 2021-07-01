import React, { ReactElement } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { useMapContext } from '../../lib/context/mapContext';

const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const MapSelector: React.FC = (): ReactElement => {
  const {
    viewport, setViewport, pinCoordinates, setPinCoordinates
  } =
    useMapContext();

  const dropMarker = ({ lngLat }): void => {
    const longitude = lngLat[0];
    const latitude = lngLat[1];
    setPinCoordinates([longitude, latitude]);
  };
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={dropMarker}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        className="mapbox"
      >
        {pinCoordinates[0] || pinCoordinates[1] ? (
          <Marker
            longitude={pinCoordinates[0]}
            latitude={pinCoordinates[1]}
            draggable
            onDragEnd={dropMarker}
          >
            <FaMapPin />
          </Marker>
        ) : null}
      </ReactMapGL>
    </>
  );
};
export default MapSelector;
