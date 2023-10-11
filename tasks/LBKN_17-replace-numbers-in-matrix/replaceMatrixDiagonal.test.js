const replaceMatrixDiagonal = require('./replaceMatrixDiagonal');

const matrixToTest = [
  [ 6,  4, -5 ],
  [ 6, -1, -7 ],
  [ 3,  5,  0 ]
];

const matrixToTest2 = [
  [-1,  4, -5, -9,  3 ],
  [ 6, -4, -7,  4, -5 ],
  [ 3,  5,  0, -9, -1 ],
  [ 1,  5, -7, -8, -9 ],
  [-3,  2,  1, -5,  6 ]
];

describe('Замена чисел двумерного массива на главной диагонали', () => {
  test('Тест 1', () => {
    expect(replaceMatrixDiagonal(matrixToTest)).toEqual([
      [ 1,  4, -5 ],
      [ 6,  0, -7 ],
      [ 3,  5,  1 ]
    ]);
  });
  test('Тест 2', () => {
    expect(replaceMatrixDiagonal(matrixToTest2)).toEqual([
      [ 0,  4, -5, -9,  3 ],
      [ 6,  0, -7,  4, -5 ],
      [ 3,  5,  1, -9, -1 ],
      [ 1,  5, -7,  0, -9 ],
      [-3,  2,  1, -5,  1 ]
    ]);
  });
});
