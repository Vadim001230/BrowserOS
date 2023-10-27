function exchangeKeysForValues(obj) {
  const rusult = {};
  for (let key in obj) {
    rusult[obj[key]] = key;
  }

  return rusult;
}
