function replaceMatrixDiagonal(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][i] = matrix[i][i] < 0 ? 0 : 1;
  }
  return matrix;
}

module.exports = replaceMatrixDiagonal;
