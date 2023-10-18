const invert = (arr) => {
  const result = [];
  arr.reduceRight((_, item) => {
    result.push(item);
  }, null);
  return result;
};