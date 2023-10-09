const findMaxPalindrome = require('./findMaxPalindrome');

describe('Поиск наибольшего полиндрома', () => {
  test('Проверка строки с английскими буквами', () => {
    expect(findMaxPalindrome('sswweeeeesdfdsf')).toBe('eeeee');
  });
  test('Проверка строки с цифрами и английскими буквами', () => {
    expect(findMaxPalindrome('fds234325iertuiejgkjjviiii2iiiiijgjdjgryy435435ghs')).toBe('iiii2iiii');
  });
});
