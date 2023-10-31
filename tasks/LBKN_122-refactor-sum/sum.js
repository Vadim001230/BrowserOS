function sumOfArr(arr) {
  let sum = 0;
  for (const value of arr) {
    if (typeof value === 'number') {
      sum += value;
    }
  }
  return sum;
}
