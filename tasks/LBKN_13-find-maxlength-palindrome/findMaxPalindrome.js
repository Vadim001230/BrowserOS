function findMaxPalindrome(str) {
  str = str.toLowerCase();
  const strLength = str.length;
  let longestPalindrome = str[0];
  
  function findPalindrome(left, right) {
    while (left >= 0 && right < strLength && str[left] === str[right]) {
      let palindrome = str.slice(left, right + 1);
      longestPalindrome = palindrome.length > longestPalindrome.length ? palindrome : longestPalindrome;
      left = left - 1;
      right = right + 1;
    }
  }

  for (let i = 0; i < strLength; i++) {
    const leftFlagForOddLengthPalindrome = i - 1;
    const rightFlagForOddLengthPalindrome = i + 1;
    findPalindrome(leftFlagForOddLengthPalindrome, rightFlagForOddLengthPalindrome);

    const leftFlagForEvenLengthPalindrome = i;
    const rightFlagForEvenLengthPalindrome = i + 1;
    findPalindrome(leftFlagForEvenLengthPalindrome, rightFlagForEvenLengthPalindrome);
  }

  return longestPalindrome;
}

module.exports = findMaxPalindrome;
