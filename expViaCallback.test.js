const expViaCallback = require('./expViaCallback');

function foo(number, callback) {
  return callback(number);
}

describe('Возведение в 4 степень', () => {
  test('Тест 1', () => {
    expect(expViaCallback(2, foo)).toBe(Math.pow(2, 4));
  });
  test('Тест 2', () => {
    expect(expViaCallback(3, foo)).toBe(Math.pow(3, 4));
  });
  test('Тест 3', () => {
    expect(expViaCallback(18, foo)).toBe(Math.pow(18, 4));
  });
});
