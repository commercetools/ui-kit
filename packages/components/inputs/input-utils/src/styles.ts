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

const getInputBoxShadow = (props: TInputProps) => {
  if (props.hasError) {
    return 'inset 0 0 0 1px var(--color-error)';
  }
  if (props.hasWarning) {
    return 'inset 0 0 0 1px var(--color-warning)';
  }
  return designTokens.shadow0;
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
    border: ${designTokens.borderWidth1} solid ${getInputBorderColor(props)};
    border-radius: ${designTokens.borderRadiusForInput};
    box-sizing: border-box;
    box-shadow: ${getInputBoxShadow(props)};
    color: ${getInputFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${designTokens.fontSize30};
    height: 40px;
    min-height: 40px;
    opacity: ${props.isDisabled || props.disabled
      ? '1'
      : 'unset'}; /* fix for mobile safari */
    outline: none;
    overflow: hidden;
    padding: 0 ${designTokens.spacing30};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard},
      box-shadow ${designTokens.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${designTokens.colorNeutral60};
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
      box-shadow: inset 0 0 0 1px var(--color-primary);
      border-color: ${designTokens.borderColorForInputWhenFocused};
      background-color: ${designTokens.backgroundColorForInputWhenFocused};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
