import React, { ReactElement } from 'react';
import ReactMapGL, { Layer, Marker, Source } from 'react-map-gl';
import { FaMapPin } from 'react-icons/fa';
import { GeoJSON } from 'geojson';
import { useMapContext } from '../../lib/context/mapContext';
import '../../styles/index.css';

const polygon1: GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [3.989067077636719, 51.10384530764609],
          [3.994474411010742, 51.10414172379734],
        ],
      },
    },
  ],
};

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Vvbm9tYWRzIiwiYSI6ImNrcWN3NDhoOTBmeWgybmw0NmZ6ZWpteGUifQ.Hm9JVYrVAImLQjekD4ZNSQ';

const MapSelector: React.FC = (): ReactElement => {
  const {
    viewport,
    setViewport,
    pinCoordinates,
    setPinCoordinates,
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
        <Source type="geojson" data={polygon1}>
          <Layer
            id="data"
            type="line"
            paint={{
              'fill-color': '#000',
              'fill-opacity': 1,
              'fill-outline-color': '#000',
            }}
          />
        </Source>
        {
          pinCoordinates[0] || pinCoordinates[1] ? (
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
