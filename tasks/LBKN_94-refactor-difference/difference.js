function getDiffBetweenObjects(obj1, obj2) {
  const diffObj = { ...obj2 };
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      diffObj[key] = obj1[key];
    } else {
      delete diffObj[key];
    }
  }
  return diffObj;
}
