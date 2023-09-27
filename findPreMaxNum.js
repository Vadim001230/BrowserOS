function findPreMaxNum(...args) {
  const sortNumbers = args.sort((a, b) => a - b);
  return sortNumbers[args.length - 2];
}

module.exports = findPreMaxNum;
