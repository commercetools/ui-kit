const getPassThroughProps = (props, componentProps) =>
  Object.keys(props)
    .filter(key => !componentProps.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = props[key];
      return obj;
    }, {});

export default getPassThroughProps;
