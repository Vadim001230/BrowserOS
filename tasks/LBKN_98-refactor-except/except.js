function getValuesExcept(obj, ...exceptions) {
  const result = {};
  for (let key in obj) {
    if (!exceptions.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
