const isPalindrome = require('./isPalindrome');

describe('Проверка на палиндром', () => {
  test('Не палиндром', () => {
    expect(isPalindrome('test')).toBeFalsy();
  });
  test('Не палиндром', () => {
    expect(isPalindrome('123')).toBeFalsy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('mom')).toBeTruthy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('Hannah')).toBeTruthy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('123 3 2 1 ')).toBeTruthy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('race car')).toBeTruthy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('A man, a plan, a canal, Panama!')).toBeTruthy();
  });
  test('Палиндром', () => {
    expect(isPalindrome('  Madam, in Eden, I"m Adam.')).toBeTruthy();
  });
});
