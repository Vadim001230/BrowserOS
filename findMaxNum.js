function findMaxNum(...args) {
  let maxNumber = -Infinity;
  
  for (let arg of args) {
    if (arg > maxNumber) {
      maxNumber = arg;
    }
  };

  return maxNumber;
}

module.exports = findMaxNum;
