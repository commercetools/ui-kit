const isFixedWidthValue = (value: string) => {
  return !Number.isNaN(parseInt(value, 10));
};

export default isFixedWidthValue;
