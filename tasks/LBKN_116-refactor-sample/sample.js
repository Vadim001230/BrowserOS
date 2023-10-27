const getRandomNumberFromRange = require('../../utils/number');

function getRandomElementFromArr(arr) {
  const randomIndex = getRandomNumberFromRange(0, arr.length - 1);
  return arr[randomIndex];
}
