const isLatter = require('../../utils/isLatter');
const isCapital = require('../../utils/isCapital');

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
