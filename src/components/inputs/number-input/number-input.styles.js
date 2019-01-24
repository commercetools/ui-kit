import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

/* we need this line-height to achieve 32px height when the component has only one row */
const sizeInputLineHeight = '22px';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getInputStyles = props => {
  const baseInputStyles = css`
    box-sizing: border-box;
    color: ${vars.fontColorDefault};
    font-family: ${vars.fontFamilyDefault};
    font-size: ${vars.fontSizeDefault};
    height: ${vars.sizeHeightInput};
    border-radius: ${vars.borderRadiusInput};
    width: 100%;
    overflow: hidden;
    padding: ${vars.spacing4} ${vars.spacing8};
    transition: ${vars.transitionStandard};
    outline: 0;
    line-height: ${sizeInputLineHeight};
    word-break: break-all;
    white-space: pre-wrap;
    resize: vertical;

    &::placeholder {
      color: ${vars.fontColorPlaceholder};
    }
  `;
  if (props.isDisabled) {
    return [
      baseInputStyles,
      css`
        cursor: not-allowed;
        color: ${vars.fontColorDisabled};
        border-color: ${vars.borderColorInputDisabled};
        background-color: ${vars.backgroundColorInputDisabled};
        opacity: 1; /* fix for mobile safari */
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseInputStyles,
      css`
        color: ${vars.fontColorError};
        border-color: ${vars.borderColorInputError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseInputStyles,
      css`
        color: ${vars.fontColorWarning};
        border-color: ${vars.borderColorInputWarning};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseInputStyles,
      css`
        border-color: ${vars.borderColorInputReadonly};
        color: ${vars.fontColorReadonly};
        cursor: default;
      `,
    ];
  }
  return [
    baseInputStyles,
    css`
      border-color: ${vars.borderColorInputPristine};
      background: ${vars.backgroundColorInputPristine};
      &:active,
      &:focus {
        border-color: ${vars.borderColorInputPristine};
        background: ${vars.backgroundColorInputPristine};
        color: ${vars.fontColorForInput};
      }
    `,
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
