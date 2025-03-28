import { MathUtils } from '../../utils/mathUtils';

describe('MathUtils', () => {
  // Unit test example 1: Test the add function
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(MathUtils.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(MathUtils.add(2, -3)).toBe(-1);
    });

    it('should handle zero', () => {
      expect(MathUtils.add(5, 0)).toBe(5);
    });
  });

  // Unit test example 2: Test the subtract function
  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(MathUtils.subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(MathUtils.subtract(3, 5)).toBe(-2);
    });
  });

  // Unit test example 3: Test the multiply function
  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(MathUtils.multiply(2, 3)).toBe(6);
    });

    it('should handle zero', () => {
      expect(MathUtils.multiply(5, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(MathUtils.multiply(2, -3)).toBe(-6);
    });
  });

  // Unit test example 4: Test the divide function
  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(MathUtils.divide(6, 3)).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => MathUtils.divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });
}); 