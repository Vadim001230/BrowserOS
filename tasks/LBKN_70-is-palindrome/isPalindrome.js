const isLetterOrNumber = require('./utils/isLetterOrNumber');

function isPalindrome(str) {
  str = str.toLowerCase();
  let leftFlag = 0;
  let rightFlag = str.length - 1;
  while (leftFlag < rightFlag) {
    if (!isLetterOrNumber(str[leftFlag])) {
      leftFlag++;
      continue;
    }
    if (!isLetterOrNumber(str[rightFlag])) {
      rightFlag--;
      continue;
    }
    if (str[leftFlag] !== str[rightFlag]) {
      return false; 
    }
    leftFlag++;
    rightFlag--;
  }
  return true;
}

module.exports = isPalindrome;
