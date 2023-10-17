const invert = (arr) => {
  const result = [];
  arr.forEach((_, index) => {
    const lastElem = arr[arr.length - index - 1];
    result.push(lastElem);
  });
  return result;
};