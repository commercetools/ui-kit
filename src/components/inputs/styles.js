import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';
import designTokens from '../../../materials/design-tokens';

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
    box-shadow: none;
    box-sizing: border-box;
    color: ${overwrittenVars[designTokens.fontColorForInput]};
    display: flex;
    flex: 1;
    font-family: ${overwrittenVars.fontFamilyDefault};
    font-size: ${overwrittenVars[designTokens.fontSizeForInput]};
    height: ${overwrittenVars.sizeHeightInput};
    min-height: ${overwrittenVars.sizeHeightInput};
    outline: none;
    overflow: hidden;
    padding: 0 ${overwrittenVars.spacingS};
    transition: border-color ${overwrittenVars.transitionStandard},
      background-color ${overwrittenVars.transitionStandard},
      color ${overwrittenVars.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${overwrittenVars[designTokens.placeholderFontColorForInput]};
    }
    &:active,
    &:focus {
      border-color: ${overwrittenVars[
        designTokens.borderColorForInputWhenFocused
      ]};
    }
  `;
  if (props.disabled || props.isDisabled) {
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
        border-color: ${overwrittenVars[
          designTokens.borderColorForInputWhenWarning
        ]};
        color: ${overwrittenVars[designTokens.fontColorForInputWhenWarning]};
      `,
    ];
  }
  if (props.readOnly || props.isReadOnly) {
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
