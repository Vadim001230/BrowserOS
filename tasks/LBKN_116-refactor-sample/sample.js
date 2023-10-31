const getRandomNumberFromRange = require('../../utils/number');

const getRandomElementFromArr = (arr) => arr[getRandomNumberFromRange(0, arr.length - 1)];
