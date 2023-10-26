const transformKeyToCamelCase = require('./utils/transformKeyToCamelCase');

function apiAdapterToCamelCase(response) {
  const responseWithKeysInCamelCase = response.map((item) => {
    const transformedItemKeystoCamelCase = {};
    const keys = Object.keys(item);

    keys.forEach((key) => {
      const camelCaseKey = transformKeyToCamelCase(key);
      transformedItemKeystoCamelCase[camelCaseKey] = item[key];
    })
    return transformedItemKeystoCamelCase;
  });

  return responseWithKeysInCamelCase;
}

module.exports = apiAdapterToCamelCase;
