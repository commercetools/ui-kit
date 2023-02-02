import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { type TTimeInputProps } from './time-input';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = () => {
  return css`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    margin: ${designTokens.spacing10};
    cursor: pointer;

    & svg *:not([fill='none']) {
      fill: ${designTokens.iconColorForDatetimeInputIcon};
    }
    &:hover svg * {
      fill: ${designTokens.iconColorForDatetimeInputIconWhenHovered};
    }
  `;
};

const getClockIconContainerColor = (props: TTimeInputProps) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInput;
};
const getClockIconContainerFontColor = (props: TTimeInputProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.fontColorForInput;
};
const getClockIconContainerBackgroundColor = (props: TTimeInputProps) => {
  if (props.isDisabled) return designTokens.backgroundColorForInputWhenDisabled;
  if (props.isReadOnly) return designTokens.backgroundColorForInputWhenReadonly;
  return 'none';
};
const getClockIconContainerStyles = (
  props: TTimeInputProps,
  isNewTheme: boolean
) => {
  return [
    css`
      align-items: center;
      box-sizing: border-box;
      background: none;
      background-color: ${getClockIconContainerBackgroundColor(props)};
      border: 0;
      border-top-right-radius: ${designTokens.borderRadiusForInput};
      border-bottom-right-radius: ${designTokens.borderRadiusForInput};
      border-color: ${getClockIconContainerColor(props)};
      color: ${getClockIconContainerFontColor(props)};
      cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
      height: 100%;
      display: flex;
      padding: ${designTokens.spacing10};
      outline: 0;
      transition: color ${designTokens.transitionStandard},
        border-color ${designTokens.transitionStandard};
      border-left: ${props.isReadOnly
        ? `1px ${designTokens.colorSurface} solid`
        : `1px ${designTokens.borderColorForInputWhenReadonly} solid`};
      &:hover:not(:disabled):not(:read-only),
      &:focus {
        border-color: ${designTokens.borderColorForInputWhenFocused};
      }
    `,
    !isNewTheme &&
      css`
        border-left: 1px solid ${getClockIconContainerColor(props)};
      `,
  ];
};

const getInputContainerBorderColor = (props: TTimeInputProps) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInput;
};
const getInputContainerFontColor = (props: TTimeInputProps) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.fontColorForInput;
};
const getInputContainerBackgroundColor = (props: TTimeInputProps) => {
  if (props.isDisabled) return designTokens.backgroundColorForInputWhenDisabled;
  if (props.isReadOnly) return designTokens.backgroundColorForInputWhenReadonly;
  return designTokens.backgroundColorForInput;
};

// This styled component is only useful because it's referenced in the styles below
const StyledClockIconContainer = styled.label``;
const getInputContainerStyles = (
  props: TTimeInputProps,
  isNewTheme: boolean
) => {
  return [
    css`
      appearance: none;
      background-color: ${getInputContainerBackgroundColor(props)};
      border: 1px solid ${getInputContainerBorderColor(props)};
      border-radius: ${designTokens.borderRadiusForInput};
      box-sizing: border-box;
      color: ${getInputContainerFontColor(props)};
      cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
      width: 100%;
      height: ${designTokens.heightForInput};
      align-items: center;
      display: flex;
      font-size: ${designTokens.fontSizeForInput};
      font-family: inherit;
      transition: border-color ${designTokens.transitionStandard},
        box-shadow ${designTokens.transitionStandard};

      svg {
        fill: ${props.isReadOnly
          ? designTokens.fontColorForInputWhenReadonly
          : 'inherit'};
      }

      &:hover {
        background-color: ${designTokens.backgroundColorForInputWhenHovered};
      }

      &:focus-within {
        border-color: ${designTokens.borderColorForInputWhenFocused};
        box-shadow: ${designTokens.boxShadowForDatetimeInputWhenHovered}
          ${designTokens.borderColorForInputWhenFocused};
        &:hover {
          background-color: ${designTokens.colorSurface};
        }
      }

      &:focus {
        border-color: ${designTokens.borderColorForInputWhenFocused};
      }
    `,
    !isNewTheme &&
      css`
        :hover:not(:disabled):not(:read-only) {
          border-color: ${designTokens.borderColorForInputWhenFocused};
        }

        &:hover,
        &:hover
          ${StyledClockIconContainer},
          &:focus-within
          ${StyledClockIconContainer} {
          border-color: ${designTokens.borderColorForInputWhenFocused};
        }
      `,
    isNewTheme &&
      props.hasError &&
      css`
        box-shadow: ${designTokens.boxShadowForDatetimeInputWhenHovered};
      `,
  ];
};
const getTimeInputStyles = (props: TTimeInputProps) => {
  const baseStyles = [
    getInputStyles(props),
    css`
      border: none;
      background: none;
      &,
      &:focus {
        box-shadow: none;
      }
      &:focus,
      &:hover {
        background-color: transparent !important;
      }
    `,
  ];
  return baseStyles;
};

const StyledInputContainer = styled.div``;

export {
  getClearSectionStyles,
  getClockIconContainerStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  StyledInputContainer,
  StyledClockIconContainer,
};
