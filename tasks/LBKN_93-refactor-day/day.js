function getSumOfValues(obj) {
  const values = Object.values(obj);
  const sum = values.reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0);
  return sum;
}
