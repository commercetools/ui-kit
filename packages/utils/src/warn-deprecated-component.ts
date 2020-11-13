import warning from 'warning';

export default (
  componentName: string,
  additionalMessage: string = ''
): void => {
  const message = `"${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;
  warning(false, message);
};
