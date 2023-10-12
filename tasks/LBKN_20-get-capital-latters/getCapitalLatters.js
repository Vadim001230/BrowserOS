const { isLatter, isCapital } = require('../../utils/string');

function getCapitalLatters(str) {
  let result = '';
  for (char of str) {
    if (isLatter(char) && isCapital(char)) {
      result += char;
    }
  }
  return result;
}

module.exports = getCapitalLatters;
