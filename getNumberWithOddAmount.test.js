const getNumberWithOddAmount = require('./getNumberWithOddAmount');

const arrayToTest = [1, 1, 5, 3, 3, 5, 5];
const arrayToTest2 = [1, 2, 3, 3, 4, -2, -2, 3, 1, 2, 4];
const arrayToTest3 = [1, 2, 3, 1, 10, 2, 10, 3, 3, 10];

describe('Число с нечетным количеством', () => {
  test('Одно число в массиве', () => {
    expect(getNumberWithOddAmount(arrayToTest)).toBe(5);
  });
  test('Одно число в массиве', () => {
    expect(getNumberWithOddAmount(arrayToTest2)).toBe(3);
  });
  test('Несколько чисел в массиве', () => {
    expect(getNumberWithOddAmount(arrayToTest3)).toEqual([3, 10]);
  });
});
