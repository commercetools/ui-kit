const convertNumericDimensionToPixelValue = (dimensionValue) =>
  typeof dimensionValue === 'number' ? `${dimensionValue}px` : dimensionValue;

export default convertNumericDimensionToPixelValue;
