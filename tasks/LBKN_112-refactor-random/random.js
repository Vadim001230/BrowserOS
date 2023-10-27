const getRandomNumberFromRange = require('../../utils/number');

function getRandomNum(min, max) {
  return !max
    ? getRandomNumberFromRange(0, min)
    : getRandomNumberFromRange(min, max);
}
