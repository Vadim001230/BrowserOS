function createUniqueRandomNumberFromRangeGenerator(min, max) {
  if (max <= min || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Invalid values');
  }
  const pastNumbers = new Set();

  return function() {
    if (pastNumbers.size === (max - min + 1)) {
      throw new Error('All numbers in the given range were returned');
    }
    let random = getRandomInRange(min, max);
    while(pastNumbers.has(random)) {
      random = getRandomInRange(min, max);
    }
    pastNumbers.add(random);

    return random;
  }
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

module.exports = createUniqueRandomNumberFromRangeGenerator;
