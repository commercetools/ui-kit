import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${vars.fontColorDisabled};
  background-color: var(--background-color-input-disabled);
  border-top-left-radius: ${vars.borderRadiusInput};
  border-bottom-left-radius: ${vars.borderRadiusInput};
  border: 1px ${vars.borderColorInputDisabled} solid;
  border-right: 0;
  padding: 0 ${vars.spacing8};
  align-items: center;
  font-size: ${vars.fontSizeDefault};
  box-sizing: border-box;
`;

const getAmountInputStyles = props => {
  const baseInputStyles = css`
    display: flex;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    color: ${vars.fontColorDefault};
    font-family: ${vars.fontFamilyDefault};
    font-size: ${vars.fontSizeDefault};
    height: ${vars.sizeHeightInput};
    border-top-right-radius: ${vars.borderRadiusInput};
    border-bottom-right-radius: ${vars.borderRadiusInput};
    border: 1px ${vars.borderColorInputPristine} solid;
    padding: 0 ${vars.spacing8};
    transition: ${vars.transitionStandard};
    outline: none;
    box-shadow: none;
    appearance: none;
    margin-left: 0;

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
  if (props.hasFocus) {
    return [
      baseInputStyles,
      css`
        border-color: ${vars.borderColorInputFocus};
        background: ${vars.backgroundColorInputPristine};
        color: ${vars.fontColorDefault};
      `,
    ];
  }
  return [
    baseInputStyles,
    css`
      border-color: ${vars.borderColorInputPristine};
      background-color: ${vars.backgroundColorInputPristine};
      &:active,
      &:focus {
        border-color: ${vars.borderColorInputFocus};
        background: ${vars.backgroundColorInputPristine};
        color: ${vars.fontColorDefault};
      }
    `,
  ];
};

export { getCurrencyLabelStyles, getAmountInputStyles };
