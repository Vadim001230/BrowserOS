function dropKeys(obj, ...keys) {
  for (let key in obj) {
    if (keys.includes(key)) {
      delete obj[key];
    }
  }
  return obj;
}
