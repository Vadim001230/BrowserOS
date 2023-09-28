function findMaxPalindrome(str) {
  str = str.replace(/\W/g, '')
           .replace(/\s/g, '')
           .toLowerCase();

  let longestPalindrome = str[0];
  
  function findPalindrome(left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      let palindrome = str.slice(left, right + 1);
      longestPalindrome = palindrome.length > longestPalindrome.length ? palindrome : longestPalindrome;
      left--;
      right++;
    }
  }

  for (let i = 0; i < str.length; i++) {
    let left = i - 1;
    let right = i + 1;
    findPalindrome(left, right);

    left = i;
    right = i + 1;
    findPalindrome(left, right);
  }

  return longestPalindrome;
}

module.exports = findMaxPalindrome;
