const isFixedWidthValue = (value: string | number) => {
  return !Number.isNaN(parseInt(String(value), 10));
};

export default isFixedWidthValue;
