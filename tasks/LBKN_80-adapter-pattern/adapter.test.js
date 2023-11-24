const { adapterFromSnakeCase, adapterFromKebabCase } = require('./adapters');
const { testResponseInSnakeCase, testResponseInKebabCase, testResponseInUpperSnakeCase } = require('./testsResponses');

const expectedResponse = [
  {
    emailAddress: 'sanya@sanya.com',
    id: 1,
    userName: 'Александр',
    userRoleAdmin: true,
  },
  {
    emailAddress: 'petya@petya.com',
    id: 2,
    userName: 'Петр',
    userRoleAdmin: false,
  },
]

describe('Трансформация ответа сервера в camelCase', () => {
  test('Трансформация из snake_case', () => {
    expect(adapterFromSnakeCase(testResponseInSnakeCase)).toEqual(expectedResponse);
  });
  test('Трансформация из kebab-case', () => {
    expect(adapterFromKebabCase(testResponseInKebabCase)).toEqual(expectedResponse);
  });
  test('Трансформация из UPPER_SNAKE_CASE', () => {
    expect(adapterFromSnakeCase(testResponseInUpperSnakeCase)).toEqual(expectedResponse);
  });
});