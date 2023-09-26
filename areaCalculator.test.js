const {Circle, Rectangle, Square, Triangle, AreaCalculator} = require('./areaCalculator');

describe('Подсчет площидей фигур', () => {
  test('Тест 1', () => {
    const shapes = [new Circle(5), new Rectangle(4, 6), new Triangle(3, 4, 5)];
    const calculator = new AreaCalculator(shapes);
    expect(calculator.calculateArea()).toBeCloseTo(108.5, 1);
  });
  test('Тест 2', () => {
    const shapes = [new Circle(2), new Rectangle(3, 8), new Square(10), new Triangle(2, 3, 4)];
    const calculator = new AreaCalculator(shapes);
    expect(calculator.calculateArea()).toBeCloseTo(139.5, 1);
  });
});
