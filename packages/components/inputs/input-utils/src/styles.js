import { css } from '@emotion/react';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

const getInputStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  const baseStyles = css`
    appearance: none;
    background-color: ${overwrittenVars[designTokens.backgroundColorForInput]};
    border: 1px solid ${overwrittenVars[designTokens.borderColorForInput]};
    border-radius: ${overwrittenVars[designTokens.borderRadiusForInput]};
    box-sizing: border-box;
    color: ${overwrittenVars[designTokens.fontColorForInput]};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${overwrittenVars[designTokens.fontSizeForInput]};
    height: ${overwrittenVars.sizeHeightInput};
    min-height: ${overwrittenVars.sizeHeightInput};
    outline: none;
    overflow: hidden;
    padding: 0 ${overwrittenVars.spacingS};
    transition: border-color ${overwrittenVars.transitionStandard},
      background-color ${overwrittenVars.transitionStandard},
      color ${overwrittenVars.transitionStandard},
      box-shadow ${overwrittenVars.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${overwrittenVars[designTokens.placeholderFontColorForInput]};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${overwrittenVars[
        designTokens.borderColorForInputWhenFocused
      ]};
    }
    :focus {
      box-shadow: inset 0 0 0 2px
        ${overwrittenVars[designTokens.borderColorForInputWhenFocused]};
    }
  `;
  if (props.isDisabled || props.disabled) {
    return [
      baseStyles,
      css`
        background-color: ${overwrittenVars[
          designTokens.backgroundColorForInputWhenDisabled
        ]};
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenDisabled
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        cursor: not-allowed;
        opacity: 1; /* fix for mobile safari */
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenError
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenError]};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        ${baseStyles}
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenWarning
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenWarning]};
      `,
    ];
  }
  if (props.isReadOnly || props.readOnly) {
    return [
      baseStyles,
      css`
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenReadonly
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        cursor: default;
      `,
    ];
  }
  return baseStyles;
};

// eslint-disable-next-line import/prefer-default-export
export { getInputStyles };
