function calculator(expression) {
  expression = expression.replace(/\s/g, '');
  const stack = [];
  let num = '';
  let sign = '+';
  let result = 0;

  for (let i = 0; i < expression.length; i++) {
    const isDigit = (+expression[i] >= 0 && +expression[i] <= 9 || expression[i] === '.');
    if (isDigit) {
      num += expression[i];
    } 
    if (!isDigit || (i === expression.length - 1)) {
      let prevNumber;
      switch (sign) {
        case '+':
          stack.push(+num);
          break;
        case '-':
          stack.push(num * -1);
          break;
        case '*':
          prevNumber = stack.pop();
          stack.push(prevNumber * num);
          break;
        case '/':
          prevNumber = stack.pop();
          stack.push(prevNumber / num);
          break;
      }
      num = '';
      sign = expression[i];
    }
  }

  while (stack.length > 0) {
    result += stack.pop();
  }

  return +result.toFixed(2);
}

module.exports = calculator;
