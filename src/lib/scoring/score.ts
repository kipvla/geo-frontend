const calculateScore = (distance: number) => {
  if (distance <= 0.15) {
    return 5000;
  }
  const exponent: number = -(distance - 0.15) / 3000;
  const score: string = (5000 * Math.exp(exponent)).toString();
  return parseInt(score, 10);
};

export default calculateScore;
