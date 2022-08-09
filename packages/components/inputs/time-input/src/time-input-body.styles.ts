import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
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
    margin: ${customProperties.spacingXs};
    cursor: pointer;

    &:hover svg * {
      fill: ${customProperties.colorWarning};
    }
  `;
};

const getClockIconContainerColor = (
  vars: typeof customProperties,
  props: TTimeInputProps
) => {
  if (props.isDisabled) {
    return vars.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return vars.borderColorForInputWhenReadonly;
  }
  return vars.borderColorForInput;
};
const getClockIconContainerFontColor = (
  vars: typeof customProperties,
  props: TTimeInputProps
) => {
  if (props.isDisabled) {
    return vars.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return vars.fontColorForInputWhenReadonly;
  }
  return vars.fontColorForInput;
};
const getClockIconContainerStyles = (props: TTimeInputProps) => {
  return css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    background-color: ${props.isDisabled
      ? customProperties.backgroundColorForInputWhenDisabled
      : 'none'};
    border: 0;
    border-left: 1px solid ${customProperties.borderColorForInput};
    border-top-right-radius: ${customProperties.borderRadiusForInput};
    border-bottom-right-radius: ${customProperties.borderRadiusForInput};
    border-color: ${getClockIconContainerColor(customProperties, props)};
    color: ${getClockIconContainerFontColor(customProperties, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: 100%;
    display: flex;
    padding: ${customProperties.spacingXs};
    outline: 0;
    transition: color ${customProperties.transitionStandard},
      border-color ${customProperties.transitionStandard};
    &:hover:not(:disabled):not(:read-only),
    &:focus {
      border-color: ${customProperties.borderColorForInputWhenFocused};
    }
  `;
};

const getInputContainerBorderColor = (
  vars: typeof customProperties,
  props: TTimeInputProps
) => {
  if (props.isDisabled) {
    return vars.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.borderColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return vars.borderColorForInputWhenReadonly;
  }
  return vars.borderColorForInput;
};
const getInputContainerFontColor = (
  vars: typeof customProperties,
  props: TTimeInputProps
) => {
  if (props.isDisabled) {
    return vars.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return vars.fontColorForInputWhenError;
  }
  if (props.isReadOnly) {
    return vars.fontColorForInputWhenReadonly;
  }
  return vars.fontColorForInput;
};
const getInputContainerStyles = (props: TTimeInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled
      ? customProperties.backgroundColorForInputWhenDisabled
      : customProperties.backgroundColorForInput};
    border: 1px solid ${getInputContainerBorderColor(customProperties, props)};
    border-radius: ${customProperties.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputContainerFontColor(customProperties, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    width: 100%;
    height: ${customProperties.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${customProperties.fontSizeDefault};
    font-family: inherit;
    transition: border-color ${customProperties.transitionStandard},
      box-shadow ${customProperties.transitionStandard};

    svg {
      fill: ${props.isReadOnly
        ? customProperties.fontColorForInputWhenReadonly
        : 'inherit'};
    }

    &:focus-within {
      border-color: ${customProperties.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px
        ${customProperties.borderColorForInputWhenFocused};
    }

    :hover:not(:disabled):not(:read-only),
    :focus {
      border-color: ${customProperties.borderColorForInputWhenFocused};
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
    border-color: ${customProperties.borderColorForInputWhenFocused};
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
