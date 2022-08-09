import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
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
    margin-right: ${customProperties.spacingXs};
    cursor: pointer;
    transition: color ${customProperties.transitionStandard},
      border-color ${customProperties.transitionStandard};

    &:hover svg * {
      fill: ${customProperties.colorWarning};
    }
  `;
};

type TState = {
  isFocused: boolean;
};

const getIconBorderColor = (props: TCalendarBody, state: TState) => {
  if (props.isDisabled) {
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  if (props.isOpen || state.isFocused) {
    return customProperties.borderColorForInputWhenFocused;
  }
  return customProperties.borderColorForInput;
};

const getIconFontColor = (props: TCalendarBody) => {
  if (props.isDisabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return 'initial';
};

const getCalendarIconContainerStyles = (
  props: TCalendarBody,
  state: TState
) => {
  return css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    border: 0;
    border-left: 1px solid ${customProperties.borderColorForInput};
    border-top-right-radius: ${customProperties.borderRadiusForInput};
    border-bottom-right-radius: ${customProperties.borderRadiusForInput};
    border-color: ${getIconBorderColor(props, state)};
    color: ${getIconFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: 100%;
    display: flex;
    padding: ${customProperties.spacingXs};
    outline: 0;
    transition: color ${customProperties.transitionStandard},
      border-color ${customProperties.transitionStandard};
    &:active,
    &:hover:not(:disabled)&:not(:read-only),
    &:focus {
      border-color: ${customProperties.borderColorForInputWhenFocused};
    }
  `;
};

const getInputBorderColor = (props: TCalendarBody, state: TState) => {
  if (props.isDisabled) {
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  if ((props.isOpen || state.isFocused) && !props.isReadOnly) {
    return customProperties.borderColorForInputWhenFocused;
  }
  return customProperties.borderColorForInput;
};
const getInputFontColor = (props: TCalendarBody) => {
  if (props.isDisabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return customProperties.fontColorForInput;
};
const getInputContainerStyles = (props: TCalendarBody, state: TState) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled
      ? customProperties.backgroundColorForInputWhenDisabled
      : customProperties.backgroundColorForInput};
    border: 1px solid ${getInputBorderColor(props, state)};
    border-radius: ${customProperties.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    width: 100%;
    height: ${customProperties.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${customProperties.fontSizeDefault};
    font-family: inherit;
    min-width: ${customProperties.constraint5};
    transition: border-color ${customProperties.transitionStandard},
      box-shadow ${customProperties.transitionStandard};

    &:focus-within {
      border-color: ${customProperties.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px
        ${customProperties.borderColorForInputWhenFocused};
    }
    &:focus,
    &:hover {
      border-color: ${props.isDisabled ||
      props.hasError ||
      props.hasWarning ||
      props.isReadOnly ||
      ((props.isOpen || state.isFocused) && !props.isReadOnly)
        ? ''
        : customProperties.borderColorForInputWhenFocused};
    }
  `;
};

const getDateTimeInputStyles = (props: TCalendarBody) => {
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
