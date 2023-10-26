function findLongestStr(strings) {
  let longestStr = '';
  for (const str of strings) {
    if (str.length > longestStr.length) {
      longestStr = str;
    }
  }

  return longestStr;
}