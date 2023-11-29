const transformKeysToCamelCase = require('./transformKeysToCamelCase');

const adapterFromKebabCase = (response) => transformKeysToCamelCase(response, '-');
const adapterFromSnakeCase = (response) => transformKeysToCamelCase(response, '_');

module.exports = { adapterFromKebabCase, adapterFromSnakeCase };
