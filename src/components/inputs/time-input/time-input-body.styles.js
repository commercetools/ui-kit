import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import designTokens from '../../../../materials/design-tokens';

import { getInputStyles } from '../styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${overwrittenVars[designTokens.backgroundColorForInput]};
    border-bottom: 1px solid
      ${overwrittenVars[designTokens.borderColorForInput]};
    border-right: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-top: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-left: none;
    height: ${overwrittenVars.sizeHeightInput};
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    transition: ${overwrittenVars.transitionStandard};
    cursor: pointer;
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenReadonly
        ]};

        svg path {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${overwrittenVars[designTokens.fontColorForInputWhenError]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getClockIconContainerStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${overwrittenVars[designTokens.backgroundColorForInput]};
    border-bottom: 1px solid
      ${overwrittenVars[designTokens.borderColorForInput]};
    border-right: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-top: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-left: none;
    height: ${overwrittenVars.sizeHeightInput};
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    border-top-right-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
    border-bottom-right-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
  `;
  if (props.isDisabled) {
    return [
      baseIconStyles,
      css`
        cursor: not-allowed;
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        cursor: default;
        color: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenReadonly
        ]};

        svg path {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${overwrittenVars[designTokens.fontColorFolorInputWhenError]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = (props, theme) => {
  const overwrittenVars = {
    ...props,
    ...theme,
  };

  return css`
    width: 100%;
    align-items: center;
    display: flex;
    font-size: ${overwrittenVars[designTokens.fontSizeForInput]};
    font-family: ${overwrittenVars[designTokens.fontSizeForInput]};
  `;
};

const getTimeInputStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return [
    getInputStyles(props, theme),
    css`
      border-radius: ${overwrittenVars[designTokens.borderRadiusForInput]} 0 0
        ${overwrittenVars[designTokens.borderRadiusForInput]};
      border-right: none;

      &:focus,
      &:active,
      &:focus + *,
      &:active + * {
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenFocused
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInput]};
        transition: ${overwrittenVars.transitionStandard};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:disabled {
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
        opacity: 1; /* fix for mobile safari */
      }
    `,
  ];
};

export {
  getClearSectionStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  getClockIconContainerStyles,
};
