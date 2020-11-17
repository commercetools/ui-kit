import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';

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
    display: flex;
    margin-right: ${vars.spacingXs};
    cursor: pointer;
    transition: color ${vars.transitionStandard},
      border-color ${vars.transitionStandard};

    &:hover svg * {
      fill: ${vars.colorWarning};
    }
  `;
};
const getIconBorderColor = (vars, props, state) => {
  if (props.isDisabled) {
    return vars.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return vars.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return vars.borderColorForInputWhenReadonly;
  }
  if (props.isOpen || state.isFocused) {
    return vars.borderColorForInputWhenFocused;
  }
  return 'initial';
};
const getIconFontColor = (vars, props) => {
  if (props.isDisabled) {
    return vars.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return vars.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return vars.fontColorForInputWhenReadonly;
  }
  return 'initial';
};
const getCalendarIconContainerStyles = (props, state) => {
  const vars = {
    ...customProperties,
    ...props.theme,
  };

  return css`
    align-items: center;
    box-sizing: border-box;
    background-color: ${props.isDisabled
      ? vars.backgroundColorForInputWhenDisabled
      : vars.backgroundColorForInput};
    border: 0;
    border-left: 1px solid ${vars.borderColorForInput};
    border-top-right-radius: ${vars.borderRadiusForInput};
    border-bottom-right-radius: ${vars.borderRadiusForInput};
    border-color: ${getIconBorderColor(vars, props, state)};
    color: ${getIconFontColor(vars, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: 100%;
    display: flex;
    padding: ${vars.spacingXs};
    outline: 0;
    transition: color ${vars.transitionStandard},
      border-color ${vars.transitionStandard};
    &:active,
    &:hover:not(:disabled)&:not(:read-only),
    &:focus {
      border-color: ${vars.borderColorForInputWhenFocused};
    }
  `;
};

const getInputBorderColor = (vars, props, state) => {
  if (props.isDisabled) {
    return vars.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return vars.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return vars.borderColorForInputWhenReadonly;
  }
  if ((props.isOpen || state.isFocused) && !props.isReadOnly) {
    return vars.borderColorForInputWhenFocused;
  }
  return vars.borderColorForInput;
};
const getInputFontColor = (vars, props) => {
  if (props.isDisabled) {
    return vars.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return vars.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return vars.fontColorForInputWhenReadonly;
  }
  return vars.fontColorForInput;
};
const getInputContainerStyles = (props, state) => {
  const vars = {
    ...customProperties,
    ...props.theme,
  };

  return css`
    appearance: none;
    background-color: ${props.isDisabled
      ? vars.backgroundColorForInputWhenDisabled
      : vars.backgroundColorForInput};
    border: 1px solid ${getInputBorderColor(vars, props, state)};
    border-radius: ${vars.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputFontColor(vars, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
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
    &:focus,
    &:hover {
      border-color: ${props.isDisabled ||
      props.hasError ||
      props.hasWarning ||
      props.isReadOnly ||
      ((props.isOpen || state.isFocused) && !props.isReadOnly)
        ? 'inherit'
        : vars.borderColorForInputWhenFocused};
    }
  `;
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
