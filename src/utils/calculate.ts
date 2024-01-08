import { isDigit } from '@/utils/number';
import { Stack, applyOperator } from '@/utils/stack';

interface CalculationResult {
  value: number;
  newIndex: number;
}

export const calculate = (expression: string, index = 0): number | CalculationResult => {
  const stackOfNumbers = new Stack();
  let currentNumber = '';
  let operator = '+';
  let result = 0;

  while (index < expression.length) {
    const char = expression[index];

    if (char === ' ') {
      index++;
      continue;
    }

    if (isDigit(char)) {
      currentNumber += char;
    } else if (char === '(') {
      const { value, newIndex } = calculate(expression, index + 1) as CalculationResult;
      currentNumber = value.toString();
      index = newIndex;
    } else if (char === ')') {
      break;
    } else {
      applyOperator(stackOfNumbers, operator, +currentNumber);

      currentNumber = '';
      operator = char;
    }

    index++;
  }

  applyOperator(stackOfNumbers, operator, +currentNumber);

  while (!stackOfNumbers.isEmpty()) {
    result += stackOfNumbers.pop();
  }

  if (index !== expression.length) {
    return { value: result, newIndex: index };
  }

  return result;
};
