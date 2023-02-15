import { warning, useWarning } from './warning';

const getMessage = (componentName: string, additionalMessage: string) =>
  `"${componentName}" has been deprecated and will be removed in the next major version. ${additionalMessage}`;

export const warnDeprecatedComponent = (
  componentName: string,
  additionalMessage = ''
): void => warning(false, getMessage(componentName, additionalMessage));

export const useWarnDeprecatedComponent = (
  componentName: string,
  additionalMessage = ''
): void => useWarning(false, getMessage(componentName, additionalMessage));
