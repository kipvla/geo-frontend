/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MapSettings } from '../../interfaces/index';

interface MapContextInterface {
  viewport: MapSettings;
  setViewport: (value: any) => void;
  pinCoordinates: [number, number];
  setPinCoordinates: (pin: [number, number]) => void;
  resetMap: () => void;
}

const defaultValue = {
  viewport: null,
  setViewport: () => {},
  pinCoordinates: null,
  setPinCoordinates: () => {},
  resetMap: () => {},
};

const initialMapSettings = {
  width: '50px',
  height: '50px',
  latitude: 22,
  longitude: -65,
  zoom: 0,
};

export const MapContext =
  React.createContext<MapContextInterface>(defaultValue);

// eslint-disable-next-line react/prop-types
export const MapProvider = ({ children }): any => {
  const [viewport, setViewport] = useState(initialMapSettings);
  const [pinCoordinates, setPinCoordinates] = useState<[number, number]>([
    0, 0,
  ]);

  const setZoomLevel = (zoom: number) => {
    setViewport({
      ...viewport,
      zoom,
    });
  };

  const resetMap = () => {
    setZoomLevel(0.4);
    setPinCoordinates([0, 0]);
  };

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
        pinCoordinates,
        setPinCoordinates,
        resetMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => React.useContext(MapContext);
