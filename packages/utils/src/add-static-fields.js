export default (Component, fields) =>
  Object.entries(fields).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    Component[key] = value;
  });
