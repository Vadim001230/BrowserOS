const findUniqueValues = require('./findUniqueValues');

describe('Поиск уникальных значений', () => {
  test('Разный тип данных', () => {
    expect(findUniqueValues([1, 2, 3, 1, 3, 1, 2, 'Да', 'Нет', 'Наверное', 'Да', 'Нет', false, false]))
      .toEqual([1, 2, 3, 'Да', 'Нет', 'Наверное', false]);
  });
  test('Пустой массив', () => {
    expect(findUniqueValues([])).toEqual([]);
  });
});
