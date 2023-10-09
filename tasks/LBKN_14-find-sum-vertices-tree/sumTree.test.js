const sumTree = require('./sumTree');
const { treeToTest, treeToTest2 } = require('./testTrees');


describe('Сумма всех вершин дерева', () => {
  test('Тест 1', () => {
    expect(sumTree(treeToTest)).toBe(17);
  });
  test('Тест 2', () => {
    expect(sumTree(treeToTest2)).toBe(26);
  });
});
