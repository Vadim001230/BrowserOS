export class Stack {
  private size!: number;
  [index: number]: number;

  constructor() {
    Object.defineProperty(this, 'size', {
      value: 0,
      configurable: false,
      enumerable: false,
      writable: true,
    });
  }

  isEmpty() {
    return this.size === 0;
  }

  push(value: number) {
    this[this.size] = value;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return 0;
    }

    this.size--;
    const elementToRemove = this[this.size];
    delete this[this.size];
    return elementToRemove;
  }
}

export const applyOperator = (stack: Stack, operator: string, number: number) => {
  switch (operator) {
    case '+':
      stack.push(number);
      break;
    case '-':
      stack.push(number * -1);
      break;
    case '*':
      stack.push(stack.pop() * number);
      break;
    case '/':
      stack.push(stack.pop() / number);
      break;
  }
};
