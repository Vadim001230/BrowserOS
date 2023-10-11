function filterArray(array, predicate) {
  const result = new Map();

  for (let i = 0; i <= array.length; i++) {
    if (predicate(array[i])) {
      result.set(i, array[i]) ;
    }
  }

  return [...result.values()];
}

module.exports = filterArray;
