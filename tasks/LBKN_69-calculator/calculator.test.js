const calculator = require('./calculator');

describe('Калькулятор', () => {
  test('Сложение', () => {
    expect(calculator('10 + 16')).toBe(26);
  });
  test('Вычитание', () => {
    expect(calculator('2 - 10')).toBe(-8);
  });
  test('Умножение', () => {
    expect(calculator('5 * 4')).toBe(20);
  });
  test('Деление', () => {
    expect(calculator('100 / 2')).toBe(50);
  });
  test('Нецелые числа', () => {
    expect(calculator('5.3 + 4.5 - 2.1')).toBeCloseTo(7.7, 2);
  });
  test('Отрицательные числа', () => {
    expect(calculator('-5 + 4 + -10')).toBe(-11);
  });
  test('Несколько математических операций', () => {
    expect(calculator('2 + 3 * 4')).toBe(14);
  });
  test('Несколько математических операций', () => {
    expect(calculator('2 * 3 + 10 / 2 - 1.1 + 5')).toBeCloseTo(14.9, 2);
  });
  test('Несколько математических операций со скобками', () => {
    expect(calculator('(2 + 3) * 4')).toBe(20);
  });
  test('Несколько математических операций со скобками', () => {
    expect(calculator('(10 + 20 * (4 - 1)) / 2')).toBe(35);
  });
});
