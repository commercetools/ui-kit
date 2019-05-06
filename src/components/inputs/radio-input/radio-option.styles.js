import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getContainerStyles = props => {
  const baseStyles = css`
    display: flex;
    align-items: center;
    svg [id$='borderAndContent'] > [id$='border'] {
      stroke: 1px ${vars.borderColorForInput} solid;
    }
    svg [id$='borderAndContent'] > [id$='content'] {
      fill: ${vars.borderColorForInputWhenFocused};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorForInputWhenDisabled};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenDisabled};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorForInputWhenError};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenError};
        }
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorForInputWhenWarning};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenWarning};
        }
      `,
    ];
  }
  if (props.isHovered && !props.isDisabled) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenFocused};
        }
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        svg [id$='borderAndContent'] > [id$='content'] {
          fill: ${vars.fontColorForInputWhenReadonly};
        }
        svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenReadonly};
        }
      `,
    ];
  }
  return baseStyles;
};

const getLabelStyles = props => {
  const baseStyles = css`
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    &:hover svg [id$='borderAndContent'] > [id$='border'] {
      stroke: ${vars.borderColorForInputWhenFocused};
    }
    &:active,
    &:focus {
      border-color: ${vars.borderColorForInputWhenFocused};
    }
  `;
  if (props.isDisabled) {
    return [
      baseStyles,
      css`
        cursor: not-allowed;
        color: ${vars.fontColorForInputWhenDisabled};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenDisabled};
        }
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorForInputWhenError};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenError};
        }
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseStyles,
      css`
        color: ${vars.fontColorForInputWhenWarning};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenWarning};
        }
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseStyles,
      css`
        cursor: default;
        color: ${vars.fontColorForInputWhenReadonly};
        &:hover svg [id$='borderAndContent'] > [id$='border'] {
          stroke: ${vars.borderColorForInputWhenReadonly};
        }
      `,
    ];
  }
  return baseStyles;
};

export { getContainerStyles, getLabelStyles };
