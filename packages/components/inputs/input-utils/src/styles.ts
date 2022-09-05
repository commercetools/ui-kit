import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

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
    return customProperties.borderColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.borderColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.borderColorForInputWhenWarning;
  }
  if (props.isReadOnly || props.readOnly) {
    return customProperties.borderColorForInputWhenReadonly;
  }
  return customProperties.borderColorForInput;
};

const getInputFontColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return customProperties.fontColorForInputWhenDisabled;
  }
  if (props.hasError) {
    return customProperties.fontColorForInputWhenError;
  }
  if (props.hasWarning) {
    return customProperties.fontColorForInputWhenWarning;
  }
  if (props.isReadOnly || props.readOnly) {
    return customProperties.fontColorForInputWhenReadonly;
  }
  return customProperties.fontColorForInput;
};

const getInputStyles = (props: TInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled || props.disabled
      ? customProperties.backgroundColorForInputWhenDisabled
      : customProperties.backgroundColorForInput};
    border: 1px solid ${getInputBorderColor(props)};
    border-radius: ${customProperties.borderRadiusForInput};
    box-sizing: border-box;
    color: ${getInputFontColor(props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${customProperties.fontSizeForInput};
    height: ${customProperties.sizeHeightInput};
    min-height: ${customProperties.sizeHeightInput};
    opacity: ${props.isDisabled || props.disabled
      ? '1'
      : 'unset'}; /* fix for mobile safari */
    outline: none;
    overflow: hidden;
    padding: 0 ${customProperties.spacingS};
    transition: border-color ${customProperties.transitionStandard},
      background-color ${customProperties.transitionStandard},
      color ${customProperties.transitionStandard},
      box-shadow ${customProperties.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${customProperties.placeholderFontColorForInput};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${customProperties.borderColorForInputWhenFocused};
    }
    :focus {
      box-shadow: inset 0 0 0 2px
        ${customProperties.borderColorForInputWhenFocused};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
