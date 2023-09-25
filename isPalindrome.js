function isPalindrome(str) {
  str = str.replace(/\W/g, '')
           .replace(/\s/g, '')
           .toLowerCase();
  return str === str.split('').reverse().join('');
}

module.exports = isPalindrome;
