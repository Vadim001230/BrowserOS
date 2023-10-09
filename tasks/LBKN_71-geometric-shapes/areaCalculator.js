class Shape {
  constructor() {}
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;  
  }

  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

class Triangle extends Shape {
  constructor(sideA, sideB, sideC) {
    super();
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  getHalfPerimeter() {
    return (this.sideA + this.sideB + this.sideC) / 2;
  }

  getArea() {
    const halfPerimeter = this.getHalfPerimeter();
    return Math.sqrt(halfPerimeter * (halfPerimeter - this.sideA) * (halfPerimeter - this.sideB) * (halfPerimeter - this.sideC));
  }
}

class AreaCalculator {
  constructor(shapes) {
    this.shapes = shapes;
  }

  calculateArea() {
    return this.shapes.reduce((acc, item) => {
      return acc + item.getArea();
    }, 0);
  }
}

module.exports = {
  Circle, 
  Rectangle, 
  Square, 
  Triangle, 
  AreaCalculator
}
