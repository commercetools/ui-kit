import warning from 'warning';

export default function warnDeprecatedProp(
  propName: string,
  componentName: string,
  additionalMessage = ''
): void {
  const message = `"${propName}" property of "${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;

  warning(false, message);
}
