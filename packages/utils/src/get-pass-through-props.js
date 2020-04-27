const getPassThroughProps = (props, componentProps) =>
  Object.keys(props)
    .filter((key) => !componentProps.includes(key))
    .reduce((passThroughProps, key) => {
      // eslint-disable-next-line no-param-reassign
      passThroughProps[key] = props[key];
      return passThroughProps;
    }, {});

export default getPassThroughProps;
