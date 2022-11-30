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

    &:hover svg * {
      fill: ${designTokens.colorWarning};
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
const getClockIconContainerStyles = (props: TTimeInputProps) => {
  return css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    background-color: ${props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : 'none'};
    border: 0;
    border-left: 1px solid ${designTokens.borderColorForInput};
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
    &:hover:not(:disabled):not(:read-only),
    &:focus {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  `;
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
const getInputContainerStyles = (props: TTimeInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput};
    border: 1px solid ${getInputContainerBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputContainerFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    width: 100%;
    height: ${designTokens.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${designTokens.fontSizeDefault};
    font-family: inherit;
    transition: border-color ${designTokens.transitionStandard},
      box-shadow ${designTokens.transitionStandard};

    svg {
      fill: ${props.isReadOnly
        ? designTokens.fontColorForInputWhenReadonly
        : 'inherit'};
    }

    &:focus-within {
      border-color: ${designTokens.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
    }

    :hover:not(:disabled):not(:read-only),
    :focus {
      border-color: ${designTokens.borderColorForInputWhenFocused};
    }
  `;
};
const getTimeInputStyles = (props: TTimeInputProps) => {
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

// This styled component is only useful because it's referenced in the `StyledInputContainer`.
const StyledClockIconContainer = styled.label``;

const StyledInputContainer = styled.div`
  &:hover,
  &:hover
    ${StyledClockIconContainer},
    &:focus-within
    ${StyledClockIconContainer} {
    border-color: ${designTokens.borderColorForInputWhenFocused};
  }
`;

export {
  getClearSectionStyles,
  getClockIconContainerStyles,
  getInputContainerStyles,
  getTimeInputStyles,
  StyledInputContainer,
  StyledClockIconContainer,
};
