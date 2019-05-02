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
    background-color: ${vars.backgroundColorForInput};
    border-bottom: 1px solid ${vars.borderColorForInput};
    border-right: 1px solid ${vars.borderColorForInput};
    border-top: 1px solid ${vars.borderColorForInput};
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
        background-color: ${vars.backgroundColorForInputWhenDisabled};
        color: ${vars.fontColorForInputWhenDisabled};
        border-color: ${vars.borderColorForInputWhenDisabled};
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
        color: ${vars.fontColorForInputWhenError};
        border-color: ${vars.borderColorForInputWhenError};
      `,
    ];
  }
  return baseIconStyles;
};

const getClockIconContainerStyles = props => {
  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${vars.backgroundColorForInput};
    border-bottom: 1px solid ${vars.borderColorForInput};
    border-right: 1px solid ${vars.borderColorForInput};
    border-top: 1px solid ${vars.borderColorForInput};
    border-left: none;
    height: ${vars.sizeHeightInput};
    display: flex;
    padding: ${vars.spacingXs};
    border-top-right-radius: ${vars.borderRadiusForInput};
    border-bottom-right-radius: ${vars.borderRadiusForInput};
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${vars.backgroundColorForInputWhenDisabled};
        color: ${vars.fontColorForInputWhenDisabled};
        border-color: ${vars.borderColorForInputWhenDisabled};
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
        color: ${vars.fontColorFolorInputWhenError};
        border-color: ${vars.borderColorForInputWhenError};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = () => css`
  width: 100%;
  align-items: center;
  display: flex;
  font-size: ${vars.fontSizeForInput};
  font-family: ${vars.fontSizeForInput};
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
      border-color: ${vars.borderColorForInputWhenFocused};
      color: ${vars.fontColorForInput};
      transition: ${vars.transitionStandard};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:disabled {
      background-color: ${vars.backgroundColorForInputWhenDisabled};
      color: ${vars.fontColorForInputWhenDisabled};
      border-color: ${vars.borderColorForInputWhenDisabled};
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
