class Shape {
  constructor(area) {
    this.area = area;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.area = Math.PI * Math.pow(radius, 2);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.area = width * height;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.area = Math.pow(side, 2);
  }
}

class Triangle extends Shape {
  constructor(a, b, c) {
    super();
    this.p = (a + b + c) / 2;
    this.area = Math.sqrt(this.p * (this.p - a) * (this.p - b) * (this.p - c));
  }
}

class AreaCalculator {
  constructor(shapes) {
    this.totalArea = shapes.map((shape) => shape.area);
  }

  calculateArea() {
    return this.totalArea.reduce((a, b) => a + b);
  }
}

module.exports.Circle = Circle;
module.exports.Rectangle = Rectangle;
module.exports.Square = Square;
module.exports.Triangle = Triangle;
module.exports.AreaCalculator = AreaCalculator;