const {Circle, Rectangle, Square, Triangle, AreaCalculator} = require('./areaCalculator');

describe('Подсчет площидей фигур', () => {
  test('Площадь круга', () => {
    const сircle = new Circle(4);
    expect(сircle.getArea()).toBeCloseTo(50.24, 1);
  });
  test('Площадь прямоугольника', () => {
    const rectangle = new Rectangle(3, 4);
    expect(rectangle.getArea()).toBe(12);
  });
  test('Площадь квадрата', () => {
    const square = new Square(5);
    expect(square.getArea()).toBe(25);
  });
  test('Площадь треугольника', () => {
    const triangle = new Triangle(3, 5, 7);
    expect(triangle.getArea()).toBeCloseTo(6.5, 1);
  });
  test('Площадь всех фигур', () => {
    const shapes = [new Circle(2), new Rectangle(3, 8), new Square(10), new Triangle(2, 3, 4)];
    const calculator = new AreaCalculator(shapes);
    expect(calculator.calculateArea()).toBeCloseTo(139.5, 1);
  });
});
