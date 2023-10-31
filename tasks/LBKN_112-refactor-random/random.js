const getRandomNumberFromRange = require('../../utils/number');

function getRandomNumber(min, max) {
  return max
    ? getRandomNumberFromRange(min, max)
    : getRandomNumberFromRange(0, min);
}
