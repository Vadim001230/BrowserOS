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

  return (
    <div className='calculator'>
      <div className='calculator__result'>{result}</div>
      <div className='calculator__buttons-container'>
        <button className='calculator__button calculator__button_grey' onClick={handleButtonClick}>(</button>
        <button className='calculator__button calculator__button_grey' onClick={handleButtonClick}>)</button>
        <button className='calculator__button calculator__button_grey' onClick={clearExpression}>C</button>
        <button className='calculator__button calculator__button_grey' onClick={deleteLastSymbol}>Backspace</button>
        <button className='calculator__button' onClick={handleButtonClick}>7</button>
        <button className='calculator__button' onClick={handleButtonClick}>8</button>
        <button className='calculator__button' onClick={handleButtonClick}>9</button>
        <button className='calculator__button calculator__button_grey' onClick={handleButtonClick}>*</button>
        <button className='calculator__button' onClick={handleButtonClick}>4</button>
        <button className='calculator__button' onClick={handleButtonClick}>5</button>
        <button className='calculator__button' onClick={handleButtonClick}>6</button>
        <button className='calculator__button calculator__button_grey' onClick={handleButtonClick}>-</button>
        <button className='calculator__button' onClick={handleButtonClick}>1</button>
        <button className='calculator__button' onClick={handleButtonClick}>2</button>
        <button className='calculator__button' onClick={handleButtonClick}>3</button>
        <button className='calculator__button calculator__button_grey' onClick={handleButtonClick}>+</button>
        <button className='calculator__button' onClick={handleButtonClick}>/</button>
        <button className='calculator__button' onClick={handleButtonClick}>0</button>
        <button className='calculator__button' onClick={handleButtonClick}>.</button>
        <button className='calculator__button calculator__button_blue' onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};
