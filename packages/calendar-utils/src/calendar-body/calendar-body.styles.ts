import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import type { TCalendarBody } from './calendar-body';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = () => {
  return css`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    margin-right: ${designTokens.spacing10};
    cursor: pointer;
    transition: color ${designTokens.transitionStandard},
      border-color ${designTokens.transitionStandard};

    & svg *:not([fill='none']) {
      fill: ${designTokens.iconColorForDatetimeInputIcon};
    }
    &:hover svg * {
      fill: ${designTokens.iconColorForDatetimeInputIconWhenHovered};
    }
  `;
};

type TState = {
  isFocused: boolean;
};

const getIconBorderColor = (props: TCalendarBody, state: TState) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  if (props.isOpen || state.isFocused) {
    return designTokens.borderColorForInputWhenFocused;
  }
  return designTokens.borderColorForInput;
};

const getIconFontColor = (props: TCalendarBody) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return 'initial';
};

const getCalendarIconContainerStyles = (
  props: TCalendarBody,
  state: TState,
  isNewTheme: boolean
) => {
  return [
    css`
      align-items: center;
      box-sizing: border-box;
      background: none;
      border: 0;
      border-top-right-radius: ${designTokens.borderRadiusForInput};
      border-bottom-right-radius: ${designTokens.borderRadiusForInput};
      border-color: ${getIconBorderColor(props, state)};
      color: ${getIconFontColor(props)};
      cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
      height: 100%;
      display: flex;
      padding: ${designTokens.spacing10};
      outline: 0;
      transition: color ${designTokens.transitionStandard},
        border-color ${designTokens.transitionStandard};
      &:active,
      &:hover:not(:disabled)&:not(:read-only),
      &:focus {
        border-color: ${designTokens.borderColorForInputWhenFocused};
      }
    `,
    !isNewTheme &&
      css`
        border-left: 1px solid ${designTokens.borderColorForInput};
      `,
  ];
};

const getInputBorderColor = (props: TCalendarBody, state: TState) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  if ((props.isOpen || state.isFocused) && !props.isReadOnly) {
    return designTokens.borderColorForInputWhenFocused;
  }
  return designTokens.borderColorForInput;
};
const getInputFontColor = (props: TCalendarBody) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.fontColorForInput;
};
const getInputContainerStyles = (
  props: TCalendarBody,
  state: TState,
  isNewTheme: boolean
) => {
  return [
    css`
      appearance: none;
      background-color: ${props.isDisabled
        ? designTokens.backgroundColorForInputWhenDisabled
        : designTokens.backgroundColorForInput};
      border: 1px solid ${getInputBorderColor(props, state)};
      border-radius: ${designTokens.borderRadiusForInput};
      box-sizing: border-box;
      color: ${getInputFontColor(props)};
      cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
      width: 100%;
      height: ${designTokens.heightForInput};
      align-items: center;
      display: flex;
      font-size: ${designTokens.fontSizeForInput};
      font-family: inherit;
      min-width: ${designTokens.constraint5};
      transition: border-color ${designTokens.transitionStandard},
        box-shadow ${designTokens.transitionStandard};

      &:focus-within {
        border-color: ${designTokens.borderColorForInputWhenFocused};
        box-shadow: inset 0 0 0 2px
          ${designTokens.borderColorForInputWhenFocused};
      }
      &:focus {
        border-color: ${props.isDisabled ||
        props.hasError ||
        props.hasWarning ||
        props.isReadOnly ||
        ((props.isOpen || state.isFocused) && !props.isReadOnly)
          ? ''
          : designTokens.borderColorForInputWhenFocused};
      }
      // &:hover:not(:has(input:focus)) {
      &:hover:not(:focus) {
        background-color: ${designTokens.backgroundColorForInputWhenHovered};
      }
    `,
    !isNewTheme &&
      css`
        &:hover {
          border-color: ${props.isDisabled ||
          props.hasError ||
          props.hasWarning ||
          props.isReadOnly ||
          ((props.isOpen || state.isFocused) && !props.isReadOnly)
            ? ''
            : designTokens.borderColorForInputWhenFocused};
        }
      `,
    isNewTheme &&
      (props.hasError || props.hasWarning) &&
      css`
        box-shadow: inset 0 0 0 2px;
      `,
  ];
};

const getDateTimeInputStyles = (props: TCalendarBody) => {
  const baseStyles = [
    getInputStyles(props),
    css`
      border: none;
      background: none;
      &,
      &:focus {
        box-shadow: none;
      }
      &:hover:not(:focus) {
        background-color: unset !important;
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
