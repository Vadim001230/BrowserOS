function getRandomNum() {
  const pastNumbers = [];
  return function getRandom() {
    let random = getRandomInRange(1, 100);

    while(pastNumbers.includes(random)) {
      random = getRandomInRange(1, 100);
    }
    
    pastNumbers.push(random);
    return random;
  }
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

module.exports = getRandomNum;
