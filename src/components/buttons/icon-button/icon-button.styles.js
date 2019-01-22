import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const buttonSizes = {
  small: '16px',
  medium: '24px',
  big: '32px',
};

const getStateStyles = (isDisabled, isActive, theme) => {
  if (isDisabled) {
    const disabledStyle = css`
      background-color: ${vars['--color-navy-98']};
      color: ${vars['--color-gray-60']};
      box-shadow: none;
    `;
    switch (theme) {
      case 'blue':
        return [
          disabledStyle,
          css`
            &:hover {
              background-color: ${vars['--color-blue-85']};
            }
          `,
        ];
      case 'green':
        return [
          disabledStyle,
          css`
            &:hover {
              background-color: ${vars['--color-green-85']};
            }
          `,
        ];
      default:
        return disabledStyle;
    }
  }
  if (isActive) {
    const activeStyle = css`
      box-shadow: ${vars['--shadow-9']};
      background-color: ${vars['--color-white']};
      &:hover {
        box-shadow: ${vars['--shadow-9']};
        background-color: ${vars['--color-gray-95']};
      }
    `;
    switch (theme) {
      case 'blue':
        return [
          activeStyle,
          css`
            ${
              // When the button is active and somehow is disabled it should have
              // a different color to indicate that it's active but can't receive any actions
              isDisabled
                ? `
                  background-color: ${vars['--color-blue-85']};
                  color: ${vars['--color-white']};
                  box-shadow: ${vars['--shadow-9']};
                `
                : ''
            }
            background-color: ${vars['--color-blue']};
            color: ${vars['--color-white']};
            &:hover {
              background-color: ${vars['--color-blue-85']};
            }
          `,
        ];
      case 'green':
        return [
          activeStyle,
          css`
            ${
              // When the button is active and somehow is disabled it should have
              // a different color to indicate that it's active but can't receive any actions
              isDisabled
                ? `
                  background-color: ${vars['--color-green-85']};
                  color: ${vars['--color-white']};
                  box-shadow: ${vars['--shadow-9']};
                `
                : ''
            }
            background-color: ${vars['--color-green']};
            color: ${vars['--color-white']};
            &:hover {
              background-color: ${vars['--color-green-85']};
            }
          `,
        ];
      default:
        return activeStyle;
    }
  }
  return css`
    &:hover {
      box-shadow: ${vars['--shadow-8']};
    }
    &:active {
      box-shadow: ${vars['--shadow-9']};
      background-color: ${vars['--color-white']};
    }
  `;
};

const getShapeStyles = (shape, size) => {
  switch (shape) {
    case 'round':
      return css`
        border-radius: 50%;
      `;
    case 'square':
      switch (size) {
        case 'small':
          return css`
            border-radius: ${vars['--border-radius-2']};
          `;
        case 'medium':
          return css`
            border-radius: ${vars['--border-radius-4']};
          `;
        case 'big':
          return css`
            border-radius: ${vars['--border-radius-6']};
          `;
        default:
          return css``;
      }
    default:
      return css``;
  }
};
const getSizeStyles = size => {
  switch (size) {
    case 'small':
      return css`
        height: ${buttonSizes.small};
        width: ${buttonSizes.small};
      `;
    case 'medium':
      return css`
        height: ${buttonSizes.medium};
        width: ${buttonSizes.medium};
      `;
    case 'big':
      return css`
        height: ${buttonSizes.big};
        width: ${buttonSizes.big};
      `;
    default:
      return css``;
  }
};
const getThemeStyles = theme => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'green':
      return css`
        &:active {
          background-color: ${vars['--color-green']};
          color: ${vars['--color-white']};
        }
      `;
    case 'blue':
      return css`
        &:hover {
          background-color: ${vars['--color-blue']};
          color: ${vars['--color-white']};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/IconButton: the specified theme '${theme}' is not supported.`
      );
      return css``;
    }
  }
};

export { getStateStyles, getShapeStyles, getSizeStyles, getThemeStyles };
