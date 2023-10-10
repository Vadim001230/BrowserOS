const createUniqueRandomNumberFromRangeGenerator = require('./getRandomUniqueNumberFromRange');

describe('Получить рандомное число от 1 до 100', () => {
  test('Все значения в находятся в границах заданного промежутка. Каждое число уникально', () => {
    const getUniqueRandomNumberFromRange = createUniqueRandomNumberFromRangeGenerator();
    const resultArr = [];
    for (let i = 1; i <= 100; i++) {
      const random = getUniqueRandomNumberFromRange();
      expect(resultArr.includes(random)).toBeFalsy();
      resultArr.push(random);
    }
    expect(resultArr).toHaveLength(100);
    expect(resultArr).toEqual([...new Set(resultArr)]);
    expect(Math.min(...resultArr)).toBe(1);
    expect(Math.max(...resultArr)).toBe(100);
  });
});
