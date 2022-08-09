import { css } from '@emotion/react';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';

type TInputProps = {
  isDisabled?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
};

const getInputBorderColor = (
  vars: typeof customProperties,
  props: TInputProps
) => {
  if (props.isDisabled || props.disabled) {
    return vars[designTokens.borderColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.borderColorForInputWhenError];
  }
  if (props.hasWarning) {
    return vars[designTokens.borderColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return vars[designTokens.borderColorForInputWhenReadonly];
  }
  return vars[designTokens.borderColorForInput];
};

const getInputFontColor = (
  vars: typeof customProperties,
  props: TInputProps
) => {
  if (props.isDisabled || props.disabled) {
    return vars[designTokens.fontColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.fontColorForInputWhenError];
  }
  if (props.hasWarning) {
    return vars[designTokens.fontColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return vars[designTokens.fontColorForInputWhenReadonly];
  }
  return vars[designTokens.fontColorForInput];
};

const getInputStyles = (props: TInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled || props.disabled
      ? customProperties[designTokens.backgroundColorForInputWhenDisabled]
      : customProperties[designTokens.backgroundColorForInput]};
    border: 1px solid ${getInputBorderColor(customProperties, props)};
    border-radius: ${customProperties[designTokens.borderRadiusForInput]};
    box-sizing: border-box;
    color: ${getInputFontColor(customProperties, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${customProperties[designTokens.fontSizeForInput]};
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
      color: ${customProperties[designTokens.placeholderFontColorForInput]};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${customProperties[
        designTokens.borderColorForInputWhenFocused
      ]};
    }
    :focus {
      box-shadow: inset 0 0 0 2px
        ${customProperties[designTokens.borderColorForInputWhenFocused]};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
