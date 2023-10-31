function exchangeKeysForValues(obj) {
  const result = {};
  for (let key in obj) {
    if (typeof obj[key] !== 'object' && typeof obj[key] !== 'function') {
      result[obj[key]] = key;
    }
    result[key] = obj[key];
  }

  return result;
}
