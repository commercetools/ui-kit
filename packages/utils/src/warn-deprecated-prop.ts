import { warning, useWarning } from './warning';

const getMessage = (
  propName: string,
  componentName: string,
  additionalMessage = ''
) =>
  `"${propName}" property of "${componentName}" component has been deprecated and will be removed in the next major version.${
    additionalMessage ? ' ' + additionalMessage : ''
  }`;

export const warnDeprecatedProp = (
  condition: boolean,
  propName: string,
  componentName: string,
  additionalMessage = ''
): void => {
  warning(condition, getMessage(propName, componentName, additionalMessage));
};

export const useWarnDeprecatedProp = (
  condition: boolean,
  propName: string,
  componentName: string,
  additionalMessage = ''
): void => {
  useWarning(condition, getMessage(propName, componentName, additionalMessage));
};
