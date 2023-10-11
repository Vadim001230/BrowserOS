function isLetterOrNumber(char) {
  if (char === ' ') return false;
  if (Number.isFinite(+char)) return true;

  char = char.toLowerCase();
  return char.toUpperCase() !== char;
}

module.exports = isLetterOrNumber;
