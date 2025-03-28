import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../../components/Calculator';
import '@testing-library/jest-dom';

describe('Calculator Component', () => {
  // Integration test: Tests the component with the MathUtils utility
  it('should perform addition correctly', () => {
    render(<Calculator />);
    
    // Get the input fields and change their values
    const num1Input = screen.getByTestId('num1-input');
    const num2Input = screen.getByTestId('num2-input');
    const calculateButton = screen.getByTestId('calculate-button');
    
    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '3' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Check result
    expect(screen.getByTestId('result')).toHaveTextContent('Result: 8');
  });
  
  it('should perform subtraction correctly', () => {
    render(<Calculator />);
    
    // Get the input fields and operation select
    const num1Input = screen.getByTestId('num1-input');
    const num2Input = screen.getByTestId('num2-input');
    const operationSelect = screen.getByTestId('operation-select');
    const calculateButton = screen.getByTestId('calculate-button');
    
    // Set values and operation
    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(operationSelect, { target: { value: 'subtract' } });
    fireEvent.change(num2Input, { target: { value: '4' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Check result
    expect(screen.getByTestId('result')).toHaveTextContent('Result: 6');
  });
  
  it('should handle division by zero error', () => {
    render(<Calculator />);
    
    // Get the input fields and operation select
    const num1Input = screen.getByTestId('num1-input');
    const num2Input = screen.getByTestId('num2-input');
    const operationSelect = screen.getByTestId('operation-select');
    const calculateButton = screen.getByTestId('calculate-button');
    
    // Set values and operation
    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(operationSelect, { target: { value: 'divide' } });
    fireEvent.change(num2Input, { target: { value: '0' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Check error message
    expect(screen.getByTestId('error')).toHaveTextContent('Error: Cannot divide by zero');
  });
}); 