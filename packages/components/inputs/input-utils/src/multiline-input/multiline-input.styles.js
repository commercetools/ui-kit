import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getInputStyles } from '../styles';

/* we need this line-height to achieve 32px height when the component has only one row */
const sizeInputLineHeight = '22px';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getTextareaStyles = (props, theme) => {
  const baseStyles = [
    getInputStyles(props, theme),
    css`
      padding: ${vars.spacingXs} ${vars.spacingS};
      line-height: ${sizeInputLineHeight};
      flex: auto;
      word-break: break-all;
      white-space: pre-wrap;
      resize: vertical;
    `,
  ];
  return baseStyles;
};

// eslint-disable-next-line import/prefer-default-export
export { getTextareaStyles };
