function compare(obj1, obj2) {
  const keys = Object.keys(obj1);
  for (let key of keys) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}
