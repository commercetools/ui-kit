import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';

const getInputStyles = props => {
  const baseStyles = css`
    appearance: none;
    background-color: ${vars.backgroundColorForInput};
    border: 1px solid ${vars.borderColorForInput};
    border-radius: ${vars.borderRadiusForInput};
    box-shadow: none;
    box-sizing: border-box;
    color: ${vars.fontColorForInput};
    display: flex;
    flex: 1;
    font-family: ${vars.fontFamilyDefault};
    font-size: ${vars.fontSizeForInput};
    height: ${vars.sizeHeightInput};
    min-height: ${vars.sizeHeightInput};
    outline: none;
    overflow: hidden;
    padding: 0 ${vars.spacing8};
    transition: ${vars.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${vars.placeholderFontColorForInput};
    }
    &:active,
    &:focus {
      border-color: ${vars.borderColorForInputWhenFocused};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        background-color: ${vars.backgroundColorForInputWhenDisabled};
        border-color: ${vars.borderColorForInputWhenDisabled};
        color: ${vars.fontColorForInputWhenDisabled};
        cursor: not-allowed;
        opacity: 1; /* fix for mobile safari */
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        border-color: ${vars.borderColorForInputWhenError};
        color: ${vars.fontColorForInputWhenError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
      ${baseStyles}
      border-color: ${vars.borderColorForInputWhenWarning};
      color: ${vars.fontColorForInputWhenWarning};
    `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        border-color: ${vars.borderColorForInputWhenReadonly};
        color: ${vars.fontColorForInputWhenReadonly};
        cursor: default;
      `,
    ];
  }
  return baseStyles;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
