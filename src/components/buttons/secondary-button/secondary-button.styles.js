import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getStateStyles = (isDisabled, isActive, theme) => {
  if (isDisabled) {
    const baseDisabledStyles = css`
      box-shadow: 0 0 0 1px ${vars['--color-gray']} inset;
      background-color: ${vars['--color-navy-98']};
      color: ${vars['--color-gray-60']};
      pointer-events: none;
      cursor: not-allowed;
    `;
    switch (theme) {
      case 'blue':
        return [
          baseDisabledStyles,
          css`
            color: ${vars['--color-gray-60']};
          `,
          isActive && `color: ${vars['--color-blue']};`,
        ];
      default:
        return baseDisabledStyles;
    }
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        box-shadow: ${vars['--shadow-9']};
        background-color: ${vars['--color-white']};
        &:hover {
          background-color: ${vars['--color-gray-95']};
        }
      `,
      isDisabled &&
        css`
          box-shadow: 0 0 0 1px ${vars['--color-gray']} inset;
          background-color: ${vars['--color-navy-98']};
          color: ${vars['--color-gray-60']};
          pointer-events: none;
        `,
    ];
    switch (theme) {
      case 'blue':
        return [
          baseActiveStyles,
          css`
            color: ${vars['--color-blue']};
          `,
        ];
      default:
        return baseActiveStyles;
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

const getThemeStyles = theme => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'blue':
      return css`
        &:hover {
          color: ${vars['--color-blue']};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/SecondaryButton: the specified theme '${theme}' is not supported.`
      );
      return css`
        &:hover {
          box-shadow: ${vars['--shadow-8']};
        }
        &:active {
          box-shadow: ${vars['--shadow-9']};
          background-color: ${vars['--color-white']};
        }
      `;
    }
  }
};

export { getStateStyles, getThemeStyles };
