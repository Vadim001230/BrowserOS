const incrementNumbers = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'number') {
      obj[key] += 1;
    }
  }
  return obj;
};

module.exports = incrementNumbers;
