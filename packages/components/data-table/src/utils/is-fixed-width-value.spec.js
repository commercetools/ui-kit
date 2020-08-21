import isFixedWidthValue from './is-fixed-width-value';

describe('when value is passed as a number', () => {
  const value = 100;
  it('should return true', () => {
    expect(isFixedWidthValue(value)).toBe(true);
  });
});

describe('when value passed as a string', () => {
  it('should return the false if can not be parsed to integer', () => {
    const value = 'max-content';
    expect(isFixedWidthValue(value)).toBe(false);
  });
  it('should return the true if can be parsed to integer', () => {
    const value = '10px';
    expect(isFixedWidthValue(value)).toBe(true);
  });
});
describe('when value is undefined', () => {
  it('should return the false if value is undefined', () => {
    expect(isFixedWidthValue(undefined)).toBe(false);
  });
});
