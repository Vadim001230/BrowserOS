const splitStrBySeparator = require('./utils/str');
const transformArrToCamelCaseStr = require('./utils/arr');

function transformKeysToCamelCase(response, separator) {
  const responseWithKeysInCamelCase = response.map((item) => {
    const transformedKeystoCamelCase = {};
    const keys = Object.keys(item);

    keys.forEach((key) => {
      const camelCaseKey = transformArrToCamelCaseStr(splitStrBySeparator(key, separator));
      transformedKeystoCamelCase[camelCaseKey] = item[key];
    })
    return transformedKeystoCamelCase;
  });

  return responseWithKeysInCamelCase;
}

module.exports = transformKeysToCamelCase;
