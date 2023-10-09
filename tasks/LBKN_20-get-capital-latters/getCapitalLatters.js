const isUpperCase = require('../../utils/isUpperCase');

function getCapitalLatters(str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      result += str[i];
    }
  }
  return result;
}

module.exports = getCapitalLatters;
