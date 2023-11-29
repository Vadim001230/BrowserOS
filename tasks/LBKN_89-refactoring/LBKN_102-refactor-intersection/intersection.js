function intersection(obj1, obj2) {
  const result = {};
  for (let key in obj1) {
    if (obj1[key] === obj2[key]) {
      result[key] = obj1[key];
    }
  }
  return result;
}
