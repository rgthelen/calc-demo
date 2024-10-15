import React, { useState } from 'react';
import './Calculator.css';
import { useRownd } from '@rownd/react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { is_authenticated, manageAccount, passkeys, signOut, requestSignIn } = useRownd();

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="calculator-page">
      <div className="header">
        <h1 className="calculator-title">Rownd Calculator</h1>
        <a href="https://gitlab.com/rgthelen/calc-demo" target="_blank" rel="noopener noreferrer" className="gitlab-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 380" width="24" height="24">
            <path fill="#e24329" d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"/>
          </svg>
        </a>
      </div>
      <div className="calculator-app">
        <div className="calculator">
          <div className="calculator-header">
            <div className="display">{display}</div>
            <button className="settings-button" onClick={toggleSettings}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          {showSettings && (
            <div className="settings-menu">
              {is_authenticated ? (
                <>
                  <button onClick={() => manageAccount()}>Profile</button>
                  <button onClick={() => passkeys.register()}>Add Passkey</button>
                  <button onClick={() => signOut()}>Logout</button>
                </>
              ) : (
                <button onClick={() => requestSignIn()}>Login</button>
              )}
            </div>
          )}
          <div className="keypad">
            <button onClick={() => inputDigit(7)}>7</button>
            <button onClick={() => inputDigit(8)}>8</button>
            <button onClick={() => inputDigit(9)}>9</button>
            <button onClick={() => performOperation('+')}>+</button>
            <button onClick={() => inputDigit(4)}>4</button>
            <button onClick={() => inputDigit(5)}>5</button>
            <button onClick={() => inputDigit(6)}>6</button>
            <button onClick={() => performOperation('-')}>-</button>
            <button onClick={() => inputDigit(1)}>1</button>
            <button onClick={() => inputDigit(2)}>2</button>
            <button onClick={() => inputDigit(3)}>3</button>
            <button onClick={() => performOperation('*')}>*</button>
            <button onClick={() => inputDigit(0)}>0</button>
            <button onClick={inputDecimal}>.</button>
            <button onClick={() => performOperation('=')}>=</button>
            <button onClick={() => performOperation('/')}>/</button>
            <button onClick={clear}>C</button>
          </div>
        </div>
      </div>
      <div className="footer">
        <a href="https://rownd.io" target="_blank" rel="noopener noreferrer" className="learn-more-button">
          Learn more
        </a>
        <p className="credit">By Rob T.</p>
      </div>
    </div>
  );
}

export default Calculator;
