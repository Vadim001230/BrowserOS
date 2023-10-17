function getDiffBetweenObjects(obj1, obj2) {
  const diffObj = {};
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      diffObj[key] = obj1[key];
    }
  }
  return diffObj;
}
