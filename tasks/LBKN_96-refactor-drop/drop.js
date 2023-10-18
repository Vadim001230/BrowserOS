function dropKeys(obj, ...keys) {
  keys.forEach((key) => delete obj[key]);
  return obj;
}
