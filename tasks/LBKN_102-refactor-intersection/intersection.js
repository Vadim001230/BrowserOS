function intersection(obj1, obj2) {
  const result = {};
  const keys = Object.keys(obj1);
  for (let key of keys) {
    if (obj1[key] === obj2[key]) {
      result[key] = obj1[key];
    }
  }
  return result;
}
