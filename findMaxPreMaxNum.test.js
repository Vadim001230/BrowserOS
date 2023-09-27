const findMaxNum = require('./findMaxNum');
const findPreMaxNum = require('./findPreMaxNum');

describe('Поиск максимального числа', () => {
  test('Тест 1', () => {
    expect(findMaxNum(5, 6)).toBe(6);
  });
  test('Тест 2', () => {
    expect(findMaxNum(1, 2, 3, 4, 5, 100, -20)).toBe(100);
  });
  test('Тест 3', () => {
    expect(findMaxNum(-10, 20, 13, 39, 29, -90)).toBe(39);
  });
});

describe('Поиск предпоследнего максимального числа', () => {
  test('Тест 1', () => {
    expect(findPreMaxNum(5, 6)).toBe(5);
  });
  test('Тест 2', () => {
    expect(findPreMaxNum(1, 2, 3, 4, 5, 100, -20)).toBe(5);
  });
  test('Тест 3', () => {
    expect(findPreMaxNum(-10, 20, 13, 39, 29, -90)).toBe(29);
  });
});
