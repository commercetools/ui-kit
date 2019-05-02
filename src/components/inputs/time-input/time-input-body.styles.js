import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import { getInputStyles } from '../styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = props => {
  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${vars.backgroundColorInputPristine};
    border-bottom: 1px solid ${vars.borderColorForInput};
    border-right: 1px solid ${vars.borderColorInputPristine};
    border-top: 1px solid ${vars.borderColorInputPristine};
    border-left: none;
    height: ${vars.sizeHeightInput};
    display: flex;
    padding: ${vars.spacingXs};
    transition: ${vars.transitionStandard};
    cursor: pointer;
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${vars.backgroundColorInputDisabled};
        color: ${vars.fontColorDisabled};
        border-color: ${vars.borderColorInputDisabled};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${vars.fontColorForInputWhenReadonly};
        border-color: ${vars.borderColorForInputWhenReadonly};

        svg path {
          fill: ${vars.fontColorForInputWhenReadonly};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${vars.fontColorError};
        border-color: ${vars.borderColorInputError};
      `,
    ];
  }
  return baseIconStyles;
};

const getClockIconContainerStyles = props => {
  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${vars.backgroundColorInputPristine};
    border-bottom: 1px solid ${vars.borderColorInputPristine};
    border-right: 1px solid ${vars.borderColorInputPristine};
    border-top: 1px solid ${vars.borderColorInputPristine};
    border-left: none;
    height: ${vars.sizeHeightInput};
    display: flex;
    padding: ${vars.spacingXs};
    border-top-right-radius: ${vars.borderRadiusInput};
    border-bottom-right-radius: ${vars.borderRadiusInput};
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${vars.backgroundColorInputDisabled};
        color: ${vars.fontColorDisabled};
        border-color: ${vars.borderColorInputDisabled};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${vars.fontColorForInputWhenReadonly};
        border-color: ${vars.borderColorForInputWhenReadonly};

        svg path {
          fill: ${vars.fontColorForInputWhenReadonly};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${vars.fontColorError};
        border-color: ${vars.borderColorInputError};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = () => css`
  width: 100%;
  align-items: center;
  display: flex;
  font-size: ${vars.fontSizeDefault};
  font-family: ${vars.fontFamilyDefault};
`;

const getTimeInputStyles = props => [
  getInputStyles(props),
  css`
    border-radius: ${vars.borderRadiusInput} 0 0 ${vars.borderRadiusInput};
    border-right: none;

    &:focus,
    &:active,
    &:focus + *,
    &:active + * {
      border-color: ${vars.borderColorInputFocus};
      color: ${vars.fontColorDefault};
      transition: ${vars.transitionStandard};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:disabled {
      background-color: ${vars.backgroundColorInputDisabled};
      color: ${vars.fontColorDisabled};
      border-color: ${vars.borderColorInputDisabled};
      opacity: 1; /* fix for mobile safari */
    }
  `,
];

export {
  getClearSectionStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  getClockIconContainerStyles,
};
