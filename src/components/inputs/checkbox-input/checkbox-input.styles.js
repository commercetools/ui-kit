import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import designTokens from '../../../../materials/design-tokens';

const getCheckboxWrapperStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };
  const baseStyles = css`
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
