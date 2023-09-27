function getCapitalLatters(str) {
  return str.replace(/[^A-ZА-ЯЁ]/g, '');
}

module.exports = getCapitalLatters;
