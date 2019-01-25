import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

const getInputStyles = props => {
  const baseStyles = css`
    appearance: none;
    background-color: ${vars.backgroundColorInputPristine};
    border: 1px solid ${vars.borderColorInputPristine};
    border-radius: ${vars.borderRadiusInput};
    box-shadow: none;
    box-sizing: border-box;
    color: ${vars.fontColorDefault};
    display: flex;
    flex: 1;
    font-family: ${vars.fontFamilyDefault};
    font-size: ${vars.fontSizeDefault};
    height: ${vars.sizeHeightInput};
    min-height: ${vars.sizeHeightInput};
    outline: none;
    overflow: hidden;
    padding: 0 ${vars.spacing8};
    transition: ${vars.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${vars.fontColorPlaceholder};
    }
    &:active,
    &:focus {
      border-color: ${vars.borderColorInputFocus};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        background-color: ${vars.backgroundColorInputDisabled};
        border-color: ${vars.borderColorInputDisabled};
        color: ${vars.fontColorDisabled};
        cursor: not-allowed;
        opacity: 1; /* fix for mobile safari */
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        border-color: ${vars.borderColorInputError};
        color: ${vars.fontColorError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
      ${baseStyles}
      border-color: ${vars.borderColorInputWarning};
      color: ${vars.fontColorWarning};
    `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        border-color: ${vars.borderColorInputReadonly};
        color: ${vars.fontColorReadonly};
        cursor: default;
      `,
    ];
  }
  return baseStyles;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
