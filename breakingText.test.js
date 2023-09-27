const BreakingText = require('./breakingText');
const { textToTest, textToTest2, textToTest3 } = require('./texts');


describe('Разбивка текста на СМС', () => {
  test('Тест 1', () => {
    const brakingText = new BreakingText(textToTest);
    expect(brakingText.splitSMS()).toEqual(['Lorem ipsum dolor sit amet consectetur adipiscing elit']);
  });
  test('Тест 2', () => {
    const brakingText = new BreakingText(textToTest2);
    expect(brakingText.splitSMS()).toEqual(['Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut 1/2', 'suscipit velit efficitur eget Sed sit amet posuere risus 2/2']);
  });
  test('Тест 3 Проверка большого текста на длину каждой строки', () => {
    const brakingText = new BreakingText(textToTest3);
    expect(brakingText.splitSMS().every((elem) => elem.length < 140)).toBeTruthy();
  });
  test('Тест 4 большой текст', () => {
    const brakingText = new BreakingText(textToTest3);
    expect(brakingText.splitSMS()).toEqual([
      'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa 1/34',
      'aaa a a  Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris 2/34',
      'felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo 3/34',
      'mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam 4/34',
      'commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium 5/34',
      'suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna 6/34',
      'pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio 7/34',
      'at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam 8/34',
      'eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit 9/34',
      'Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur 10/34',
      'adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet 11/34',
      'consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor 12/34',
      'sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem 13/34',
      'ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a 14/34',
      'a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut 15/34',
      'aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris 16/34',
      'felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam 17/34',
      'commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium 18/34',
      'suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna 19/34',
      'pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio 20/34',
      'at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam 21/34',
      'eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing 22/34',
      'elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a  Lorem ipsum dolor sit amet consectetur 23/34',
      'adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet 24/34',
      'consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor 25/34',
      'sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem 26/34',
      'ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a 27/34',
      'a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut 28/34',
      'aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris 29/34',
      'felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam 30/34',
      'commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium 31/34',
      'suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna 32/34',
      'pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio 33/34',
      'at magna pretium suscipit Nam commodo mauris felis ut aaa aaa a a Lorem ipsum dolor sit amet 34/34'
    ]);
  });
});
