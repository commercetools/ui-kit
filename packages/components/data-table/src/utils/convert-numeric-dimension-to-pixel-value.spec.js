import convertNumericDimensionToPixelValue from './convert-numeric-dimension-to-pixel-value';

describe('when passed a number', () => {
  const numberValue = 100;
  it('should return the value as string of css size in pixels', () => {
    const converted = convertNumericDimensionToPixelValue(numberValue);
    expect(converted).toBe('100px');
  });
});

describe('when passed a string', () => {
  const stringValue = '100vh';
  it('should return the same value that was passed', () => {
    const converted = convertNumericDimensionToPixelValue(stringValue);
    expect(converted).toBe(stringValue);
  });
});
