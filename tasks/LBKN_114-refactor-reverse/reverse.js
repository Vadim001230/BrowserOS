function exchangeKeysForValues(obj) {
  const result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' || typeof obj[key] === 'function') {
      result[JSON.stringify(obj[key])] = key;
    }
    result[obj[key]] = key;
  }

  return result;
}