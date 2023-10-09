const findHIndex = require('./findHIndex');

describe('Найти h-index', () => {
  test('Несколько публикаций по одной цитате', () => {
    expect(findHIndex([1, 1, 1])).toBe(1);
  });
  test('Одна публикация', () => {
    expect(findHIndex([100])).toBe(1);
  });
  test('Несколько публикаций с разным количеством цитат', () => {
    expect(findHIndex([8, 10, 12, 5, 4, 2])).toBe(4);
  });
});
