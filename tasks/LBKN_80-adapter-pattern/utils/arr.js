const transformArrToCamelCaseStr = (arr) => (
  arr.reduce((acc, value) => acc + value[0].toUpperCase() + value.slice(1))
);

module.exports = transformArrToCamelCaseStr;
