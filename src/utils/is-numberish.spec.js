import isNumberish from './is-numberish';

describe('check if number is valid', () => {
  it('should pass positive number', () => {
    expect(isNumberish('2')).toBe(true);
  });

  it('should pass decimal number with point', () => {
    expect(isNumberish('2.2')).toBe(true);
  });

  it('should pass decimal number with comma', () => {
    expect(isNumberish('2,2')).toBe(true);
  });

  it('should pass negative number', () => {
    expect(isNumberish('-2')).toBe(true);
  });
});
