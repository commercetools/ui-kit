import { css } from '@emotion/react';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import { designTokens } from '@commercetools-uikit/design-system';

type TInputProps = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
};

const getInputContainerBorderColor = (props: TInputProps) => {
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
  return designTokens.borderColorForInput;
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

const getIconColor = (props: TInputProps) => {
  if (props.isDisabled || props.isReadOnly) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  return designTokens.fontColorForInput;
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

const getSearchTextInputButtonStyles = (props: TInputProps) => css`
  border: none;
  background: none;
  height: 100%;
  border-top-right-radius: ${designTokens.borderRadiusForInput};
  border-bottom-right-radius: ${designTokens.borderRadiusForInput};
  border-left: none;
  align-items: center;
  padding-right: ${designTokens.paddingForInput};
  fill: ${getIconColor(props)};
  transition: border-color ${designTokens.transitionStandard},
    background-color ${designTokens.transitionStandard};
  transition: border-color ${designTokens.transitionStandard},
    box-shadow ${designTokens.transitionStandard};
`;

const getClearIconButtonStyles = (props: TInputProps) => [
  getSearchTextInputButtonStyles(props),
  css`
    fill: ${designTokens.fontColorForClearInputIcon};
    &:hover {
      fill: ${designTokens.fontColorForClearInputIconWhenHovered};
    }
  `,
];

const getSearchIconButtonStyles = (props: TInputProps) => [
  getSearchTextInputButtonStyles(props),
  css`
    fill: ${designTokens.fontColorForSearchInputIcon};
    &:hover {
      fill: ${designTokens.fontColorForSearchInputIconWhenHovered};
    }
  `,
];

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
];

export {
  getSearchTextInputStyles,
  getSearchTextInputContainerStyles,
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
};
