/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
};

const initialMapSettings = {
  latitude: 25,
  longitude: 10,
  zoom: 0,
  bearing: 0,
  pitch: 0,
};

export const MapContext =
  React.createContext<MapContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const MapProvider = ({ children }): any => {
  const [viewport, setViewport] = useState(initialMapSettings);
  const [mapDimensions, setMapDimensions] = useState({
    width: '10rem',
    height: '10rem',
  });
  const [pinCoordinates, setPinCoordinates] = useState<[number, number]>([
    0, 0,
  ]);

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
    setMapDimensions({ width: '52rem', height: '30rem' });
  };

  const setMapToSmall = () => {
    setViewport({
      latitude: 31,
      longitude: 12,
      zoom: 0,
      bearing: 0,
      pitch: 0,
    });
    setMapDimensions({ width: '10rem', height: '10rem' });
  };

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
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
