const isFixedWidthValue = (value) => {
  return !Number.isNaN(parseInt(value, 10));
};

export default isFixedWidthValue;
