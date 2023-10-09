const expViaCallback = require('./expViaCallback');

function foo(number, callback) {
  return callback(number);
}

describe('Возведение в 4 степень', () => {
  test('Проверка однозначного числа', () => {
    expect(expViaCallback(3, foo)).toBe(Math.pow(3, 4));
  });
  test('Проверка большого числа', () => {
    expect(expViaCallback(18843, foo)).toBe(Math.pow(18843, 4));
  });
});
