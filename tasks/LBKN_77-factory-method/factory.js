class IPhone {
  constructor(model, color, diagonal) {
    this.model = model;
    this.color = color;
    this.diagonal = diagonal;
  }

  getOptions() {
    return `Модель: iPhone${this.model}, Цвет: ${this.color}, Диагональ: ${this.diagonal} дюймов`;
  }
};

class IPhoneFactory {
  create(model, color) {
    switch(model) {
      case('5'):
        return new IPhone(5, color, 4);
      case('6'):
        return new IPhone(6, color, 4.7);
      case('X'):
        return new IPhone('X', color, 5.8);
      case('12'):
        return new IPhone(12, color, 6.1);
      default:
        throw new Error('Такой iPhone не найден');
    }
  }
}

const factory = new IPhoneFactory();

const iPhone5 = factory.create('5', 'белый');
const iPhoneX = factory.create('X', 'черный');

console.log(iPhone5.getOptions());
console.log(iPhoneX.getOptions());
