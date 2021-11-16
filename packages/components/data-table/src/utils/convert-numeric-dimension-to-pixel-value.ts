const convertNumericDimensionToPixelValue = (dimensionValue: number | string) =>
  typeof dimensionValue === 'number' ? `${dimensionValue}px` : dimensionValue;

export default convertNumericDimensionToPixelValue;
