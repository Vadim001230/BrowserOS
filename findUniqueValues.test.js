const findUniqueValues = require('./findUniqueValues');

describe('Поиск уникальных значений', () => {
  test('Уникальные значения – числа', () => {
    expect(findUniqueValues([1, 2, 3, 1, 3, 1, 2])).toEqual([1, 2, 3]);
  });
  test('Уникальные значения – строки', () => {
    expect(findUniqueValues(['Да', 'Нет', 'Наверное', 'Да', 'Нет'])).toEqual(['Да', 'Нет', 'Наверное']);
  });
  test('Пустой массив', () => {
    expect(findUniqueValues([])).toEqual([]);
  });
});
