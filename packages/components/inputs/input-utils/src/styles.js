import { css } from '@emotion/react';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';

const getInputBorderColor = (vars, props) => {
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
const getInputFontColor = (vars, props) => {
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
const getInputStyles = (props, theme) => {
  const vars = {
    ...customProperties,
    ...theme,
  };

  return css`
    appearance: none;
    background-color: ${props.isDisabled || props.disabled
      ? vars[designTokens.backgroundColorForInputWhenDisabled]
      : vars[designTokens.backgroundColorForInput]};
    border: 1px solid ${getInputBorderColor(vars, props)};
    border-radius: ${vars[designTokens.borderRadiusForInput]};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-sizing: border-box;
    color: ${getInputFontColor(vars, props)};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${vars[designTokens.fontSizeForInput]};
    height: ${vars.sizeHeightInput};
    min-height: ${vars.sizeHeightInput};
    opacity: ${props.isDisabled || props.disabled
      ? '1'
      : 'unset'}; /* fix for mobile safari */
    outline: none;
    overflow: hidden;
    padding: 0 ${vars.spacingS};
    transition: border-color ${vars.transitionStandard},
      background-color ${vars.transitionStandard},
      color ${vars.transitionStandard}, box-shadow ${vars.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${vars[designTokens.placeholderFontColorForInput]};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${vars[designTokens.borderColorForInputWhenFocused]};
    }
    :focus {
      box-shadow: inset 0 0 0 2px
        ${vars[designTokens.borderColorForInputWhenFocused]};
    }
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
