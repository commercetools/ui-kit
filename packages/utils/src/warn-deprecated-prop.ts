import warning from 'warning';

export default (
  propName: string,
  componentName: string,
  additionalMessage: string = ''
): void => {
  const message = `"${propName}" property of "${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;
  warning(false, message);
};
