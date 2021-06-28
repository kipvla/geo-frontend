// import distanceBetweenTwoPoints from './distance';

const calculateScore = (
  // lat1: number,
  // lon1: number,
  // lat2: number,
  // lon2: number,
  distance: number,
) => {
  // const distance: number = distanceBetweenTwoPoints(lat1, lon1, lat2, lon2);
  if (distance <= 0.15) {
    return 5000;
  }
  const exponent: number = -(distance - 0.15) / 3000;
  const score: string = (5000 * Math.exp(exponent)).toString();
  return parseInt(score, 10);
};

export default calculateScore;
