function filterArray(array, predicate) {
  let result = [];

  for (let i = 0; i <= array.length; i++) {
    if (predicate(array[i])) {
      result = [...result, array[i]];
    }
  }

  return result;
}

module.exports = filterArray;
