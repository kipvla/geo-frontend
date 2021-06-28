import { MapAction, MapItem } from '../lib/context/gameContext';

export const updateMap = (location: MapItem): MapAction => ({
  type: 'UPDATE',
  payload: location,
});

export default updateMap;
