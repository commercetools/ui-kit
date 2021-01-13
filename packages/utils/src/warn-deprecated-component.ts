import warning from 'warning';

export default function warnDeprecatedComponent(
  componentName: string,
  additionalMessage = ''
): void {
  const message = `"${componentName}" has been deprecated and will be removed in the next major version.${additionalMessage}`;

  warning(false, message);
}
