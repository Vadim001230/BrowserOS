const getCapitalLatters = require('./getCapitalLatters');

describe('Вернуть заглавные буквы', () => {
  test('Латиница', () => {
    expect(getCapitalLatters('Get CAPITAL latterS')).toBe('GCAPITALS');
  });
  test('Кириллица', () => {
    expect(getCapitalLatters('Получить Заглавные Буквы')).toBe('ПЗБ');
  });
  test('Латиница, кириллица', () => {
    expect(getCapitalLatters('Get Заглавны Latters')).toBe('GЗL');
  });
  test('Латиница, кириллица, цифры, символы', () => {
    expect(getCapitalLatters('Все Вместе 123__-%;№"; ALL IN')).toBe('ВВALLIN');
  });
});
