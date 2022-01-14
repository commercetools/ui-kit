import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { type TTimeInput } from './time-input';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getClearSectionStyles = (theme: Theme) => {
  const overwrittenVars = {
    ...customProperties,
    ...theme,
  };

  return css`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    margin: ${overwrittenVars.spacingXs};
    cursor: pointer;

    &:hover svg * {
      fill: ${overwrittenVars.colorWarning};
    }
  `;
};

type TExtendedTheme = Theme & {
  [key: string]: string;
};

const getClockIconContainerColor = (
  vars: TExtendedTheme,
  props: TTimeInput
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
  vars: TExtendedTheme,
  props: TTimeInput
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
const getClockIconContainerStyles = (props: TTimeInput, theme: Theme) => {
  const overwrittenVars = {
    ...customProperties,
    ...theme,
  };

  return css`
    align-items: center;
    box-sizing: border-box;
    background: none;
    background-color: ${props.isDisabled
      ? overwrittenVars.backgroundColorForInputWhenDisabled
      : 'none'};
    border: 0;
    border-left: 1px solid ${overwrittenVars.borderColorForInput};
    border-top-right-radius: ${overwrittenVars.borderRadiusForInput};
    border-bottom-right-radius: ${overwrittenVars.borderRadiusForInput};
    border-color: ${getClockIconContainerColor(overwrittenVars, props)};
    color: ${getClockIconContainerFontColor(overwrittenVars, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: 100%;
    display: flex;
    padding: ${overwrittenVars.spacingXs};
    outline: 0;
    transition: color ${overwrittenVars.transitionStandard},
      border-color ${overwrittenVars.transitionStandard};
    &:hover:not(:disabled):not(:read-only),
    &:focus {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
    }
  `;
};

const getInputContainerBorderColor = (
  vars: TExtendedTheme,
  props: TTimeInput
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
  vars: TExtendedTheme,
  props: TTimeInput
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
const getInputContainerStyles = (props: TTimeInput, theme: Theme) => {
  const overwrittenVars = {
    ...customProperties,
    ...theme,
  };

  return css`
    appearance: none;
    background-color: ${props.isDisabled
      ? overwrittenVars.backgroundColorForInputWhenDisabled
      : overwrittenVars.backgroundColorForInput};
    border: 1px solid ${getInputContainerBorderColor(overwrittenVars, props)};
    border-radius: ${overwrittenVars.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputContainerFontColor(overwrittenVars, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    width: 100%;
    height: ${overwrittenVars.sizeHeightInput};
    align-items: center;
    display: flex;
    font-size: ${overwrittenVars.fontSizeDefault};
    font-family: inherit;
    transition: border-color ${overwrittenVars.transitionStandard},
      box-shadow ${overwrittenVars.transitionStandard};

    svg {
      fill: ${props.isReadOnly
        ? overwrittenVars.fontColorForInputWhenReadonly
        : 'inherit'};
    }

    &:focus-within {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
      box-shadow: inset 0 0 0 2px
        ${overwrittenVars.borderColorForInputWhenFocused};
    }

    :hover:not(:disabled):not(:read-only),
    :focus {
      border-color: ${overwrittenVars.borderColorForInputWhenFocused};
    }
  `;
};
const getTimeInputStyles = (props: TTimeInput) => {
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
