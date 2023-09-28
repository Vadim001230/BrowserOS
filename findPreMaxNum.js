function findPreMaxNum(...args) {
  let max = -Infinity;
  let preMax = -Infinity;

  for (let arg of args) {
    if (arg > max) {
      preMax = max;
      max = arg;
    } else if (arg > preMax && arg < max) {
      preMax = arg;
    }
  }

  return preMax;
}

module.exports = findPreMaxNum;
