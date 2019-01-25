import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getContainerStyles = props => {
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
  if (props.isHovered && !props.isDisabled) {
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

const getLabelStyles = props => {
  if (props.isDisabled) {
    return css`
      cursor: not-allowed;
    `;
  }
  return css`
    cursor: pointer;
    &:hover svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${vars.borderColorInputFocus};
    }
  `;
};

export { getContainerStyles, getLabelStyles };
