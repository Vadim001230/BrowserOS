const getRandomNum = require('./getRandomNum');

describe('Получить рандомное число от 1 до 100', () => {
  test('Число от 1 до 100', () => {
    const randomNum = getRandomNum();
    const random = randomNum();
    expect(random).toBeGreaterThanOrEqual(1);
    expect(random).toBeLessThanOrEqual(100);
  });
  test('Заполнение массива от 1 до 50, все числа уникальные', () => {
    const randomNum = getRandomNum();
    const resultArr = [];
    for (let i = 1; i <= 50; i++) {
      const random = randomNum();
      resultArr.push(random);
    }
    expect(resultArr).toHaveLength(50);
    expect(resultArr).toEqual([...new Set(resultArr)]);
    expect(Math.min(...resultArr)).toBeGreaterThanOrEqual(1);
    expect(Math.max(...resultArr)).toBeLessThanOrEqual(100);
  });
  test('Заполнение массива от 1 до 100, все числа уникальные', () => {
    const randomNum = getRandomNum();
    const resultArr = [];
    for (let i = 1; i <= 100; i++) {
      const random = randomNum();
      resultArr.push(random);
    }
    expect(resultArr).toHaveLength(100);
    expect(resultArr).toEqual([...new Set(resultArr)]);
    expect(Math.min(...resultArr)).toBe(1);
    expect(Math.max(...resultArr)).toBe(100);
  });
});
