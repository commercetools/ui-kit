import warning from 'warning';

export default (propName, componentName, additionalMessage) => {
  const message = `"${propName}" property of "${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;

  warning(false, message);
};
