import { useState } from 'react';
import { calculate } from '@/utils/calculate';
import './Calculator.scss';

export const Calculator = () => {
  const [result, setResult] = useState('0');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.textContent as string;

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

  const buttons = [
    '(', ')', 'C', 'Backspace',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '/', '0', '.', '='
  ];

  return (
    <div className='calculator'>
      <div className='calculator__result'>{result}</div>
      <div className='calculator__buttons-container'>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`calculator__button ${button === '=' ? 'calculator__button_blue' : ''}`}
            onClick={
              button === 'C' ? clearExpression :
              button === 'Backspace' ? deleteLastSymbol :
              button === '=' ? calculateResult :
              handleButtonClick
            }
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};
