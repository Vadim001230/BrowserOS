const findHIndex = require('./findHIndex');

describe('Найти h-index', () => {
  test('Тест 1', () => {
    expect(findHIndex([1, 1, 1])).toBe(1);
  });
  test('Тест 2', () => {
    expect(findHIndex([1, 3, 2])).toBe(2);
  });
  test('Тест 3', () => {
    expect(findHIndex([1, 3, 2])).toBe(2);
  });
  test('Тест 4', () => {
    expect(findHIndex([100])).toBe(1);
  });
  test('Тест 5', () => {
    expect(findHIndex([8, 10, 12, 5, 4, 2])).toBe(4);
  });
  test('Тест 6', () => {
    expect(findHIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5);
  });
});
