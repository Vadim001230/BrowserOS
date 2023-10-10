const getRandomNumberFromRange = require('../../utils/number');

function createUniqueRandomNumberFromRangeGenerator(min = 1, max = 100) {
  if (max <= min || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Invalid values');
  }
  const pastNumbers = new Set();

  return function() {
    let random = getRandomNumberFromRange (min, max);
    if (pastNumbers.size === (max - min + 1)) {
      return random;
    }
    
    while(pastNumbers.has(random)) {
      random = getRandomNumberFromRange (min, max);
    }
    pastNumbers.add(random);

    return random;
  }
}

module.exports = createUniqueRandomNumberFromRangeGenerator;
