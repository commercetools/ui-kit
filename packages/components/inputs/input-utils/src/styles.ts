import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

type TInputProps = {
  isDisabled?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
  horizontalConstraint?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const getInputBorderColor = (
  props: TInputProps,
  defaultBorderColor: string = designTokens.borderColorForInput
) => {
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
  return defaultBorderColor;
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

const getInputBoxShadow = (props: TInputProps) => {
  if (props.hasError) {
    return designTokens.shadowForInputWhenError;
  }
  if (props.hasWarning) {
    return designTokens.shadowForInputWhenWarning;
  }
  return designTokens.shadowForInput;
};

const getInputBackgroundColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenReadonly;
  }
  return designTokens.backgroundColorForInput;
};

const getInputStyles = (props: TInputProps) => {
  return css`
    appearance: none;
    background-color: ${getInputBackgroundColor(props)};
    border: ${getInputBorderWidth(props)} solid ${getInputBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-sizing: border-box;
    box-shadow: ${getInputBoxShadow(props)};
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
    width: ${props.horizontalConstraint === 'auto' ? 'auto' : '100%'};

    &::placeholder {
      color: ${designTokens.placeholderFontColorForInput};
    }
    :active:not(:disabled):not(:read-only),
    :hover:not(:disabled):not(:read-only):not(:focus) {
      border-color: ${getInputBorderColor(
        props,
        designTokens.borderColorForInputWhenHovered
      )};
      background-color: ${designTokens.backgroundColorForInputWhenHovered};
    }
    :focus:not(:read-only) {
      box-shadow: ${designTokens.shadowForInputWhenFocused};
      border-color: ${designTokens.borderColorForInputWhenFocused};
      background-color: ${designTokens.backgroundColorForInputWhenFocused};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
