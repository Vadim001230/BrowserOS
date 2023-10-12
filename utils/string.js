const isLatter = (char) => char.toLowerCase() !== char.toUpperCase();
const isCapital = (char) => char === char.toUpperCase();

module.exports = { isCapital, isLatter };
