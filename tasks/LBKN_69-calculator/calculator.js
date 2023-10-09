function calculator(expression) {
  expression = expression.replace(/\s/g, '');
  return calculate(expression, 0);
}

function calculate(expression, index) {
  const stack = [];
  let num = '';
  let sign = '+';
  let result = 0;

  for (let i = index; i < expression.length; i++) {
    const isDigit = (+expression[i] >= 0 && +expression[i] <= 9 || expression[i] === '.');
    if (isDigit) {
      num += expression[i];
    } 
    if (!isDigit || (i === expression.length - 1)) {
      if (expression[i] === '(') {
        num = calculate(expression, i + 1);
        let countOpenBrackets = 1;
        let countCloseBrackets = 0;
        for (let j = i + 1; j < expression.length; j++) {
          if (expression[j] === ')') {
            countCloseBrackets++;
            if (countOpenBrackets === countCloseBrackets) {
              i = j + 1;
              break;
            }
          } else if (expression[j] === '(') {
            countOpenBrackets++;
          }
        }
      }

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
      if (expression[i] === ')') break;
    }
  }

  while (stack.length > 0) {
    result += stack.pop();
  }
  return result;
}

module.exports = calculator;
