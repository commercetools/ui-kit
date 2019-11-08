import warning from 'warning';

export default (componentName, additionalMessage = '') => {
  const message = `"${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;

  warning(false, message);
};
