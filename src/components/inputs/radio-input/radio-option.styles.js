import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

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
  if (props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorError};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputError};
        }
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorWarning};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputWarning};
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
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorReadonly};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputReadonly};
        }
      `,
    ];
  }
  return baseStyles;
};

const getLabelStyles = props => {
  const baseStyles = css`
    cursor: pointer;
    &:hover svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${vars.borderColorInputFocus};
    }
    &:active,
    &:focus {
      border-color: ${vars.borderColorInputFocus};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        cursor: not-allowed;
        color: ${vars.fontColorDisabled};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputDisabled};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorError};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputError};
        }
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorWarning};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputWarning};
        }
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        cursor: default;
        color: ${vars.fontColorReadonly};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorInputReadonly};
        }
      `,
    ];
  }
  return baseStyles;
};

export { getContainerStyles, getLabelStyles };
