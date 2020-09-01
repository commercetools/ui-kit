import { css } from '@emotion/core';
import { customProperties } from '@commercetools-uikit/design-system';
import { getInputStyles } from '../../../../packages/components/inputs/styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = (props) => {
  const vars = {
    ...customProperties,
    ...props.theme,
  };

  return css`
    align-items: center;
    box-sizing: border-box;
    height: ${vars.sizeHeightInput};
    display: flex;
    padding: ${vars.spacingXs};
    cursor: pointer;
    transition: color ${vars.transitionStandard},
      border-color ${vars.transitionStandard};

    &:focus {
      outline: auto 2px ${vars.borderColorForInputWhenFocused};
      svg * {
        fill: ${vars.colorWarning};
      }
    }
    &:hover svg * {
      fill: ${vars.colorWarning};
    }
  `;
};
const getCalendarIconContainerStyles = (props, state) => {
  const vars = {
    ...customProperties,
    ...props.theme,
  };

  const baseIconStyles = css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    border: 0;
    border-left: 1px solid ${vars.borderColorForInput};
    border-top-right-radius: ${vars.borderRadiusForInput};
    border-bottom-right-radius: ${vars.borderRadiusForInput};
    height: 100%;
    display: flex;
    padding: ${vars.spacingXs};
    outline: 0;
    transition: color ${vars.transitionStandard},
      border-color ${vars.transitionStandard};
    &:active,
    &:hover,
    &:focus {
      border-color: ${vars.borderColorForInputWhenFocused};
    }
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
  if (props.hasError) {
    return [
      baseIconStyles,
      css`
        color: ${vars.fontColorForInputWhenError};
        border-color: ${vars.borderColorForInputWhenError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseIconStyles,
      css`
        color: ${vars.fontColorForInputWhenWarning};
        border-color: ${vars.borderColorForInputWhenWarning};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseIconStyles,
      css`
        color: ${vars.fontColorForInputWhenReadonly};
        border-color: ${vars.borderColorForInputWhenReadonly};
      `,
    ];
  }
  if (props.isOpen || state.isFocused) {
    return [
      baseIconStyles,
      css`
        border-color: ${vars.borderColorForInputWhenFocused};
      `,
    ];
  }
  return baseIconStyles;
};

const getInputContainerStyles = (props, state) => {
  const vars = {
    ...customProperties,
    ...props.theme,
  };

  const baseStyles = css`
    appearance: none;
    background-color: ${vars.backgroundColorForInput};
    border: 1px solid ${vars.borderColorForInput};
    border-radius: ${vars.borderRadiusForInput};
    box-sizing: border-box;
    color: ${vars.fontColorForInput};
    width: 100%;
    height: ${vars.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${vars.fontSizeDefault};
    font-family: inherit;
    transition: border-color ${vars.transitionStandard},
      box-shadow ${vars.transitionStandard};

    &:focus-within {
      border-color: ${vars.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px ${vars.borderColorForInputWhenFocused};
    }
  `;

  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        background-color: ${vars.backgroundColorForInputWhenDisabled};
        color: ${vars.fontColorForInputWhenDisabled};
        border-color: ${vars.borderColorForInputWhenDisabled};
        cursor: not-allowed;
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorForInputWhenError};
        border-color: ${vars.borderColorForInputWhenError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorForInputWhenWarning};
        border-color: ${vars.borderColorForInputWhenWarning};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorForInputWhenReadonly};
        border-color: ${vars.borderColorForInputWhenReadonly};
      `,
    ];
  }

  if ((props.isOpen || state.isFocused) && !props.isReadOnly) {
    return [
      baseStyles,
      css`
        border-color: ${vars.borderColorForInputWhenFocused};
        color: ${vars.fontColorForInput};
      `,
    ];
  }

  return [
    baseStyles,
    css`
      &:focus,
      &:hover {
        border-color: ${vars.borderColorForInputWhenFocused};
      }
    `,
  ];
};

const getDateTimeInputStyles = (props) => {
  const baseStyles = [
    getInputStyles(props),
    css`
      border: none;
      background: none;
      &:focus {
        box-shadow: none;
      }
    `,
  ];
  return baseStyles;
};

export {
  getClearSectionStyles,
  getInputContainerStyles,
  getDateTimeInputStyles,
  getCalendarIconContainerStyles,
};
