import React, { useState } from 'react';
import { MathUtils } from '../utils/mathUtils';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    try {
      let calculatedResult: number;
      
      switch (operation) {
        case 'add':
          calculatedResult = MathUtils.add(num1, num2);
          break;
        case 'subtract':
          calculatedResult = MathUtils.subtract(num1, num2);
          break;
        case 'multiply':
          calculatedResult = MathUtils.multiply(num1, num2);
          break;
        case 'divide':
          calculatedResult = MathUtils.divide(num1, num2);
          break;
        default:
          throw new Error('Invalid operation');
      }
      
      setResult(calculatedResult);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="calculator">
      <h2>Simple Calculator</h2>
      
      <div className="inputs">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
          data-testid="num1-input"
        />
        
        <select 
          value={operation}
          onChange={(e) => setOperation(e.target.value as Operation)}
          data-testid="operation-select"
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          data-testid="num2-input"
        />
        
        <button 
          onClick={handleCalculate}
          data-testid="calculate-button"
        >
          =
        </button>
      </div>
      
      {result !== null && (
        <div className="result" data-testid="result">
          Result: {result}
        </div>
      )}
      
      {error && (
        <div className="error" data-testid="error">
          Error: {error}
        </div>
      )}
    </div>
  );
}; 