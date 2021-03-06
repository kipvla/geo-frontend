/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { WebMercatorViewport } from 'react-map-gl';
import { MapSettings } from '../../interfaces/index';

interface MapContextInterface {
  viewport: MapSettings;
  setViewport: (value: any) => void;
  pinCoordinates: [number, number];
  setPinCoordinates: (pin: [number, number]) => void;
  resetMap: () => void;
  resetViewport: () => void;
  mapDimensions: { width: string; height: string };
  setMapToLarge: () => void;
  setMapToSmall: () => void;
  customViewport: (
    lng: number,
    trueLng: number,
    lat: number,
    trueLat: number
  ) => void;
}

const defaultValue = {
  viewport: null,
  setViewport: () => {},
  pinCoordinates: null,
  setPinCoordinates: () => {},
  resetMap: () => {},
  resetViewport: () => {},
  mapDimensions: null,
  setMapToLarge: () => {},
  setMapToSmall: () => {},
  customViewport: () => {},
};

const initialMapSettings = {
  latitude: 25,
  longitude: 10,
  zoom: 0,
  bearing: 0,
  pitch: 0,
};

const smallMapDimensions = {
  width: '10rem',
  height: '10rem',
};

const largeMapDimensions = {
  width: '52rem',
  height: '30rem',
};

export const MapContext =
  React.createContext<MapContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const MapProvider = ({ children }): any => {
  const [viewport, setViewport] = useState(initialMapSettings);
  const [mapDimensions, setMapDimensions] = useState(smallMapDimensions);
  const [pinCoordinates, setPinCoordinates] = useState<[number, number]>([
    0, 0,
  ]);

  const customViewport = (
    lng: number,
    trueLng: number,
    lat: number,
    trueLat: number
  ) => {
    const corners: [[number, number], [number, number]] = [
      [Math.min(lng, trueLng), Math.min(lat, trueLat)],
      [Math.max(lng, trueLng), Math.max(lat, trueLat)],
    ];
    const customView = new WebMercatorViewport({
      width: 800,
      height: 600,
    }).fitBounds(corners, { padding: 200 });
    let { longitude, latitude, zoom } = customView;

    if (zoom < 1) {
      zoom = 0;
    } else {
      zoom *= 0.8;
    }

    setViewport({
      latitude,
      longitude,
      zoom,
      bearing: 0,
      pitch: 0,
    });
  };

  const resetMap = () => {
    setViewport(initialMapSettings);
    setPinCoordinates([0, 0]);
  };

  const resetViewport = () => {
    setViewport(initialMapSettings);
  };

  const setMapToLarge = () => {
    setViewport({
      latitude: 31,
      longitude: 12,
      zoom: 0.8,
      bearing: 0,
      pitch: 0,
    });
    setMapDimensions(largeMapDimensions);
  };

  const setMapToSmall = () => {
    setViewport({
      latitude: 31,
      longitude: 12,
      zoom: 0,
      bearing: 0,
      pitch: 0,
    });
    setMapDimensions(smallMapDimensions);
  };

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
        customViewport,
        pinCoordinates,
        setPinCoordinates,
        resetMap,
        resetViewport,
        mapDimensions,
        setMapToSmall,
        setMapToLarge,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => React.useContext(MapContext);
