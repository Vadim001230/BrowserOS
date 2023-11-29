function getNumbersWithoutDuplicates(arr) {
  return [...new Set(arr)].filter((el) => typeof el === 'number');
}
