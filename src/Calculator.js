import React, { useState, useRef } from 'react';

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const inputRef = useRef(null);

  const handleButtonClick = (value) => {
    const inputElement = inputRef.current;
    const startPosition = inputElement.selectionStart;
    const endPosition = inputElement.selectionEnd;

    const handlePercentageButton = () => {
      if (value === '%') {
        const prevChar = expression[startPosition - 1];
        return prevChar === undefined || /\W/.test(prevChar) ? value + '*()*()' : value;
      }
      return value;
    };


    const calculateFactorial = (n) => {
      if (n === 0 || n === 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    };
    
    setExpression((prevExpression) => {
      const startExpression = prevExpression.slice(0, startPosition);
      const endExpression = prevExpression.slice(endPosition);
      const newValue = value === 'x!' ? calculateFactorial(Number(prevExpression.slice(startPosition, endPosition))) : handlePercentageButton();
      const newExpression = startExpression + newValue + endExpression;
      return newExpression;
    });
    

    // Move the cursor to the right of the newly added value after state update
    setTimeout(() => {
      const newCursorPosition = startPosition + value.length;
      inputElement.selectionStart = newCursorPosition;
      inputElement.selectionEnd = newCursorPosition;
    }, 0);
  };



  const calculateResult = () => {
    try {
      let replacedExpression = expression
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/tan/g, 'Math.tan')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/log/g, 'Math.log')
        .replace(/ln/g, 'Math.log')
        .replace(/EX/g, 'Math.exp')
        .replace(/\^/g, '**')
        .replace(/%/g, '(1/100)*');

      const result = eval(replacedExpression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };


  const clearExpression = () => {
    setExpression('');
  };

  return (
    <div className="calculator">

      <div className="calculator-grid input">
        <input type="text" className="form-control" value={expression} ref={inputRef}
          onChange={(e) => setExpression(e.target.value)} />
      </div>

      <div className="calculator-grid">
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('Deg')}>Deg</button>
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('x!')}>x!</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('(')}>(</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick(')')}>)</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('%')}>%</button>
        <button className="col themed-grid-col p-3" onClick={clearExpression}>AC</button>
      </div>
      <div className="calculator-grid">
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('sin()')}>sin()</button>
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('ln()')}>ln()</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('7')}>7</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('8')}>8</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('9')}>9</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('/')}>/</button>
      </div>
      <div className="calculator-grid">
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('cos()')}>cos()</button>
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('log()')}>log()</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('4')}>4</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('5')}>5</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('6')}>6</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('*')}>*</button>
      </div>
      <div className="calculator-grid">
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('tan()')}>tan()</button>
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('sqrt()')}>sqrt()</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('1')}>1</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('2')}>2</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('3')}>3</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('-')}>-</button>
      </div>
      <div className="calculator-grid">
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('EX()')}>EX()</button>
        <button className="col themed-grid-col p-3 d-none d-sm-block" onClick={() => handleButtonClick('^')}>^</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('0')}>0</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('.')}>.</button>
        <button className="col themed-grid-col p-3" onClick={calculateResult}>=</button>
        <button className="col themed-grid-col p-3" onClick={() => handleButtonClick('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
