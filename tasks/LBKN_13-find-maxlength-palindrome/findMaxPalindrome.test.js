const findMaxPalindrome = require('./findMaxPalindrome');

describe('Поиск наибольшего полиндрома', () => {
  test('Проверка строки с английскими буквами и четным количеством символов', () => {
    expect(findMaxPalindrome('sswweeeeeesdfdsf')).toBe('eeeeee');
  });
  test('Проверка строки с цифрами, английскими буквами и нечетным количеством символов', () => {
    expect(findMaxPalindrome('fds234325iertuiejgkjjviiii2iiiiijgjdjgryy435435ghs')).toBe('iiii2iiii');
  });
});
