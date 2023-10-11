function getNumbersWithOddAmount(array) {
  const result = [];
  const objCounter = {};
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] in objCounter) {
      objCounter[array[i]]++;
    } else {
      objCounter[array[i]] = 1;
    }
  }

  for (let key in objCounter) {
    if (objCounter[key] % 2 !== 0) {
      result.push(+key);
    }
  }

  return result;
}

module.exports = getNumbersWithOddAmount;
