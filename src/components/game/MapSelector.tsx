import React, { ReactElement } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { RiMapPin3Line } from 'react-icons/ri';
import { useMapContext } from '../../lib/context/mapContext';

const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const MapSelector: React.FC = (): ReactElement => {
  const { viewport, setViewport, pinCoordinates, setPinCoordinates } =
    useMapContext();

  const dropMarker = ({ lngLat }): void => {
    const longitude = lngLat[0];
    const latitude = lngLat[1];
    setPinCoordinates([longitude, latitude]);
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      onViewportChange={(newViewport) => setViewport(newViewport)}
      onClick={dropMarker}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      className="mapbox"
      width="100%"
      height="100%"
    >
      {pinCoordinates[0] || pinCoordinates[1] ? (
        <Marker
          longitude={pinCoordinates[0]}
          latitude={pinCoordinates[1]}
          draggable
          onDragEnd={dropMarker}
          offsetLeft={-12}
          offsetTop={-21}
        >
          <RiMapPin3Line className="map__pin" />
        </Marker>
      ) : null}
    </ReactMapGL>
  );
};
export default MapSelector;
