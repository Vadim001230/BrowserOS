const calculator = require('./calculator');

describe('Калькулятор', () => {
  test('Сложение', () => {
    expect(calculator('10 + 16')).toBe(26);
  });
  test('Вычитание', () => {
    expect(calculator('2 - 10')).toBe(-8);
  });
  test('Умножение', () => {
    expect(calculator('5 * 4.8')).toBe(24);
  });
  test('Деление', () => {
    expect(calculator('100 / 2')).toBe(50);
  });
  test('Возведение в степень', () => {
    expect(calculator('4 + 3 ** 2')).toBe(13);
  });
  test('Несколько математических операций', () => {
    expect(calculator('2 + 3 * 4')).toBe(14);
  });
  test('Несколько математических операций со скобками', () => {
    expect(calculator('(10 + 20 * (4 - 1)) / 2')).toBe(35);
  });
});
