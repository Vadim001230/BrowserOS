const incrementNumbers = require('./inc');

const testObj = {
  first: 1,
  second: 2,
  key: 'str',
  randomNum: 324,
  boolean: true
}

describe('Увеличить все числа в объекте', () => {
  test('Объект с числами, строками, булевыми значениями', () => {
    expect(incrementNumbers(testObj)).toEqual({ first: 2, second: 3, key: 'str', randomNum: 325, boolean: true });
  });
});
