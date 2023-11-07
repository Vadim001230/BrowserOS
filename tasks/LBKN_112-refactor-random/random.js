const getRandomNumberFromRange = require('../../utils/number');

const getRandomNumber = (min, max) => (
  max ? getRandomNumberFromRange(min, max) : getRandomNumberFromRange(0, min)
);
