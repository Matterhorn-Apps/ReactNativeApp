/* eslint-disable import/prefer-default-export */

// Add 'export' to fake this being a module to silence TSLint.
export const add = (a: number, b: number): number => a + b;
describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 1)).toEqual(2);
  });
});
