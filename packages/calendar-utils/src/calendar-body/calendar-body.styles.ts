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
      fill: ${designTokens.colorNeutral40};
    }
    &:hover svg * {
      fill: ${designTokens.colorError};
    }
  `;
};

type TState = {
  isFocused?: boolean;
};

const getIconBorderColor = (props: TCalendarBody, state: TState) => {
  if (props.appearance === 'filter') {
    return designTokens.colorTransparent;
  }
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
  state: TState
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
        border-color: ${props.appearance === 'filter'
          ? designTokens.colorTransparent
          : designTokens.borderColorForInputWhenFocused};
      }
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
  if (props.isOpen || state.isFocused) {
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

const getInputContainerBackgroundColor = (props: TCalendarBody) => {
  if (props.appearance === 'filter') {
    return designTokens.colorTransparent;
  }
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return designTokens.backgroundColorForInput;
};

const getInputContainerStyles = (props: TCalendarBody, state: TState) => {
  return [
    css`
      appearance: none;
      background-color: ${getInputContainerBackgroundColor(props)};
      border: 1px solid ${getInputBorderColor(props, state)};
      border-radius: ${designTokens.borderRadiusForInput};
      box-sizing: border-box;
      color: ${getInputFontColor(props)};
      cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
      width: 100%;
      height: ${props.isCondensed
        ? `${designTokens.heightForInputAsSmall}`
        : `${designTokens.heightForInput}`};
      align-items: center;
      display: flex;
      font-size: ${designTokens.fontSize30};
      font-family: inherit;
      min-width: ${designTokens.constraint5};
      transition: border-color ${designTokens.transitionStandard},
        box-shadow ${designTokens.transitionStandard};

      &:hover:not(:focus) {
        background-color: ${!props.isDisabled && !props.isReadOnly
          ? props.appearance === 'filter'
            ? designTokens.colorTransparent
            : designTokens.backgroundColorForInputWhenHovered
          : null};
      }
      &:focus {
        border-color: ${props.isDisabled ||
        props.hasError ||
        props.hasWarning ||
        props.isReadOnly ||
        ((props.isOpen || state.isFocused) && !props.isReadOnly)
          ? ''
          : props.appearance === 'filter'
          ? designTokens.colorTransparent
          : designTokens.borderColorForInputWhenFocused};
      }
    `,
    !props.isReadOnly &&
      props.appearance !== 'filter' &&
      css`
        &:focus-within {
          border-color: ${designTokens.borderColorForInputWhenFocused};
          box-shadow: inset 0 0 0 1px
            ${designTokens.borderColorForInputWhenFocused};
          &:hover {
            background-color: ${designTokens.colorSurface};
          }
        }
      `,
    (props.hasError || props.hasWarning) &&
      props.appearance !== 'filter' &&
      css`
        box-shadow: inset 0 0 0 1px;
      `,
  ];
};

const getDateTimeInputStyles = (props: TCalendarBody) => {
  const baseStyles = [
    getInputStyles(props),
    css`
      border: none;
      background: none !important;
      &,
      &:focus:not(:read-only) {
        box-shadow: none;
      }
      font-size: ${props.isCondensed
        ? `${designTokens.fontSize20}`
        : `${designTokens.fontSize30}`};
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
