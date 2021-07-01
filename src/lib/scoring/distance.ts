// calculates the Haversine Distance between two sets of co-ordinates

const distanceBetweenTwoPoints = (
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
): number => {
  const R = 6378.137; // Radius of earth in km
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.floor(d); // km
};

export default distanceBetweenTwoPoints;
