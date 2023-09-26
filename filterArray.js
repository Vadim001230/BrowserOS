function filterArray(array, predicate) {
  const result = []

  for (let i = 0; i <= array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i])
    }
  }

  return result
}

module.exports = filterArray;
