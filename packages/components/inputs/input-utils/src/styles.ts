import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

type TInputProps = {
  isDisabled?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
};

const getInputBorderColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly || props.readOnly) {
    return designTokens.borderColorForInputWhenReadonly;
  }
  return designTokens.borderColorForInput;
};

const getInputFontColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return designTokens.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return designTokens.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly || props.readOnly) {
    return designTokens.fontColorForInputWhenReadonly;
  }
  return designTokens.fontColorForInput;
};

const getInputBorderWidth = (props: TInputProps) => {
  if (props.hasError) {
    return designTokens.borderWidthForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.borderWidthForInputWhenWarning;
  }
  return designTokens.borderWidthForInput;
};

const getInputStyles = (props: TInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled || props.disabled
      ? designTokens.backgroundColorForInputWhenDisabled
      : designTokens.backgroundColorForInput};
    border: ${getInputBorderWidth(props)} solid ${getInputBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${designTokens.fontSizeForInput};
    height: ${designTokens.heightForInput};
    min-height: ${designTokens.heightForInput};
    opacity: ${props.isDisabled || props.disabled
      ? '1'
      : 'unset'}; /* fix for mobile safari */
    outline: none;
    overflow: hidden;
    padding: 0 ${designTokens.paddingForInput};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard},
      box-shadow ${designTokens.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${designTokens.placeholderFontColorForInput};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${designTokens.borderColorForInputWhenFocused};
      background-color: ${designTokens.backgroundColorForInputWhenHovered};
    }
    :focus {
      box-shadow: inset 0 0 0 2px ${designTokens.borderColorForInputWhenFocused};
      border: ${designTokens.borderWidthForInputWhenFocused} solid
        ${designTokens.borderColorForInputWhenFocused};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
