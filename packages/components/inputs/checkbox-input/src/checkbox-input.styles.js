import { css } from '@emotion/core';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

const getCheckboxWrapperStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };
  const baseStyles = css`
    /* resets from createStyledIcon styles */
    * {
      fill: none;
    }

    display: flex;
    align-items: center;
    svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${overwrittenVars[designTokens.borderColorForInput]};
      fill: ${overwrittenVars[designTokens.backgroundColorForInput]};
    }
    svg [id$='borderAndContent'] > [id$='content'] {
      fill: ${overwrittenVars[designTokens.borderColorForInputWhenFocused]};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${overwrittenVars[
            designTokens.borderColorForInputWhenDisabled
          ]};
        }
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${overwrittenVars[designTokens.fontColorForInputWhenReadonly]};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${overwrittenVars[
            designTokens.borderColorForInputWhenReadonly
          ]};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${overwrittenVars[designTokens.borderColorForInputWhenError]};
        }

        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${overwrittenVars[designTokens.fontColorForInputWhenError]};
        }
      `,
    ];
  }
  if (props.isHovered && !props.isDisabled && !props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${overwrittenVars[
            designTokens.borderColorForInputWhenFocused
          ]};
        }
      `,
    ];
  }
  return baseStyles;
};

// eslint-disable-next-line import/prefer-default-export
export { getCheckboxWrapperStyles };
