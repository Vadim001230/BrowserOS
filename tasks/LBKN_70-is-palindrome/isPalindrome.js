function isPalindrome(str) {
  str = str.toLowerCase()
           .replace(/\s/g, '')
           .replace(/[^а-яёa-z1-9]/gi, '')

  return str === str.split('').reverse().join('');
}

module.exports = isPalindrome;
