import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getLabelStyles = props => {
  if (props.isDisabled) {
    return css`
      cursor: not-allowed;
    `;
  }
  if (props.hasError) {
    return css``;
  }
  return css`
    cursor: pointer;
    &:hover svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${vars.borderColorInputFocus};
    }
  `;
};

const getCheckboxWrapperStyles = props => {
  const baseStyles = css`
    display: flex;
    align-items: center;
    svg [id$='borderAndContent'] > [id$='border'] {
      stroke: 1px ${vars.borderColorInputPristine} solid;
    }
    svg [id$='borderAndContent'] > [id$='content'] {
      fill: ${vars.borderColorInputFocus};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorDisabled};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputDisabled};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.borderColorInputError};
        }

        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.fontColorError};
        }
      `,
    ];
  }
  if (props.isHovered && !props.isDisabled && !props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputFocus};
        }
      `,
    ];
  }
  return baseStyles;
};

export { getLabelStyles, getCheckboxWrapperStyles };
