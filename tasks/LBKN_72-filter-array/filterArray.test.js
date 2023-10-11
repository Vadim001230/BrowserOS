const filterArray = require('./filterArray');

const arrayToTest = [1, 2, 3, 4, 5];
const arrayToTest2 = [1, 2, 3, 4, -2, -4, 5, 10, 0, -5];

describe('Проверка фильтрации массива', () => {
  test('Оставить четные элементы', () => {
    const isEven = (elem) => elem % 2 === 0;
    expect(filterArray(arrayToTest, isEven)).toEqual(arrayToTest.filter(isEven));
  });
  test('Оставить не отрицательные элементы', () => {
    const isPositive = (elem) => elem >= 0;
    expect(filterArray(arrayToTest2, isPositive)).toEqual(arrayToTest2.filter(isPositive));
  });
});
