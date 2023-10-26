function transformKeyToCamelCase(key) {
  key = key.toLowerCase();
  let camelCaseKey = key[0];
  for (let i = 1; i < key.length; i++) {
    if (key[i] === '_' || key[i] === '-') {
      camelCaseKey += key[i + 1].toUpperCase();
      i++;
    } else {
      camelCaseKey += key[i];
    }
  }

  return camelCaseKey;
}

module.exports = transformKeyToCamelCase;

