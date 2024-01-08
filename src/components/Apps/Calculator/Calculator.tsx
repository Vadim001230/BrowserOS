import { useState } from 'react';
import { calculate } from '@/utils/calculate';
import './Calculator.scss';

const buttons = [
  '(', ')', 'C', 'Backspace',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '/', '0', '.', '='
];

export const Calculator = () => {
  const [result, setResult] = useState('0');

  const defaultButtonClickHandler = (value: string) => {
    if (
      ('+-*/'.includes(value) && '+-*/'.includes(result[result.length - 1])) ||
      (result === '0' && value !== '.')
    ) {
      setResult((prevValue) => prevValue.slice(0, -1) + value);
    } else {
      setResult((prevValue) => prevValue + value);
    }
  };

  const deleteLastSymbol = () => setResult((prevValue) => prevValue.slice(0, -1));

  const clearExpression = () => setResult('');

  const calculateResult = () => setResult(calculate(result).toString());

  const handleButtonClick = (buttonType: string) => {
    const buttonHandlers: Record<string, () => void> = {
      'C': clearExpression,
      'Backspace': deleteLastSymbol,
      '=': calculateResult,
    };

    const handler = buttonHandlers[buttonType] || defaultButtonClickHandler.bind(null, buttonType);
    handler();
  };

  return (
    <div className='calculator'>
      <div className='calculator__result'>{result}</div>
      <div className='calculator__buttons-container'>
        {buttons.map((buttonType, index) => (
          <button
            key={index}
            className={`calculator__button ${buttonType === '=' ? 'calculator__button_blue' : ''}`}
            onClick={() => handleButtonClick(buttonType)}
          >
            {buttonType}
          </button>
        ))}
      </div>
    </div>
  );
};
