const getCapitalLatters = require('./getCapitalLatters');

describe('Вернуть заглавные буквы', () => {
  test('Латиница, кириллица', () => {
    expect(getCapitalLatters('Get Заглавные Latters 234')).toBe('GЗL');
  });
  test('Разные символы', () => {
    expect(getCapitalLatters('ÇВсе Вместе ĝ 123__-%;№"; ALL INĞĐ')).toBe('ÇВВALLINĞĐ');
  });
});
