const findMaxPalindrome = require('./findMaxPalindrome');

describe('Поиск наибольшего полиндрома', () => {
  test('Тест 1', () => {
    expect(findMaxPalindrome('sswweeeeesdfdsf')).toBe('eeeee');
  });
  test('Тест 2', () => {
    expect(findMaxPalindrome('fds234325iertuiejgkjjviiii2iiiiijgjdjgryy435435ghs')).toBe('iiii2iiii');
  });
  test('Тест 3', () => {
    expect(findMaxPalindrome('wasitacaroracatisaw')).toBe('wasitacaroracatisaw');
  });
});
