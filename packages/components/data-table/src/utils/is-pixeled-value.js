const isPixeledValue = (value) => {
  return !Number.isNaN(parseInt(value, 10));
};

export default isPixeledValue;
