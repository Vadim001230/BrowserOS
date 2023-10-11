function filterArray(array, predicate) {
  const result = new Set();

  for (let i = 0; i <= array.length; i++) {
    if (predicate(array[i])) {
      result.add(array[i]);
    }
  }

  return [...result];
}

module.exports = filterArray;
