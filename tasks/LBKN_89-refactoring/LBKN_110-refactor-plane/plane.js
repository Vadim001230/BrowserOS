function flatten(arr, initialArr = []) {
  const result = [...initialArr, ...arr.flat(Infinity)];
  return result;
}
