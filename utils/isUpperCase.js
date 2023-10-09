function isUpperCase(char) {
  return char.toUpperCase() === char && char.toLowerCase() !== char;
}

module.exports = isUpperCase;