import { css } from '@emotion/react';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { designTokens } from '@commercetools-uikit/design-system';

type TInputProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
};

const getInputContainerBorderColor = (
  props: TInputProps,
  defaultColor: string = designTokens.borderColorForInput
) => {
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
  return defaultColor;
};

const getInputBoxShadow = (props: TInputProps) => {
  if (props.hasError) {
    return designTokens.shadowForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.shadowForInputWhenWarning;
  }
  return designTokens.shadowForInput;
};

const getSearchTextInputStyles = (props: TInputProps) => [
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

const getButtonStyles = () => css`
  border: none;
  background: none;
  height: 100%;
  border-top-right-radius: ${designTokens.borderRadiusForInput};
  border-bottom-right-radius: ${designTokens.borderRadiusForInput};
  border-left: none;
  align-items: center;
  transition: border-color ${designTokens.transitionStandard},
    background-color ${designTokens.transitionStandard};
  transition: border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard};
`;

const getIconColor = (props: TInputProps, defaultColor: string) => {
  if (props.isDisabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.fontColorForSearchInputIconWhenReadonly;
  }
  return defaultColor;
};

const getClearIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    margin-right: ${designTokens.marginRightForClearInputIcon};
    fill: ${getIconColor(props, designTokens.fontColorForClearInputIcon)};
    &:hover {
      fill: ${getIconColor(
        props,
        designTokens.fontColorForClearInputIconWhenHovered
      )};
    }
  `,
];

const getSearchIconButtonStyles = (props: TInputProps) => [
  getButtonStyles(),
  css`
    margin-right: ${designTokens.marginRightForSearchInputIcon};
    fill: ${getIconColor(props, designTokens.fontColorForSearchInputIcon)};
    &:hover {
      fill: ${getIconColor(
        props,
        designTokens.fontColorForSearchInputIconWhenHovered
      )};
    }
  `,
];

const getBackgroundWhenHovered = (props: TInputProps) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return designTokens.backgroundColorForInputWhenHovered;
};

const getSearchTextInputContainerStyles = (props: TInputProps) => [
  css`
    display: flex;
    align-items: center;
    background-color: ${props.isDisabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput};
    border: 1px solid ${getInputContainerBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-shadow: ${getInputBoxShadow(props)};
    height: ${designTokens.heightForInput};
    box-sizing: border-box;
    &:hover {
      border-color: ${getInputContainerBorderColor(
        props,
        designTokens.borderColorForInputWhenHovered
      )};
      background-color: ${getBackgroundWhenHovered(props)};
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
];

export {
  getSearchTextInputStyles,
  getSearchTextInputContainerStyles,
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
};
