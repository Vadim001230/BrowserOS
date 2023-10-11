const isPalindrome = require('./isPalindrome');

describe('Проверка на палиндром', () => {
  test('Не палиндром', () => {
    expect(isPalindrome('Test')).toBeFalsy();
  });
  test('Палиндром цифры', () => {
    expect(isPalindrome('123 3 2 1 ')).toBeTruthy();
  });
  test('Палиндром латиница и знаки препинания', () => {
    expect(isPalindrome('A man, a plan, a canal, Panama!')).toBeTruthy();
  });
  test('Палиндром кириллица и знаки препинания', () => {
    expect(isPalindrome('Идем, молод, долом меди.')).toBeTruthy();
  });
  test('Палиндром разные символы', () => {
    expect(isPalindrome('!22çĐĈĞ ĞĈĐç22!')).toBeTruthy();
  });
});
