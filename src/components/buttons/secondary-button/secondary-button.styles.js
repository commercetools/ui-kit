import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getStateStyles = (isDisabled, isActive, theme) => {
  if (isDisabled) {
    const baseDisabledStyles = css`
      box-shadow: 0 0 0 1px ${vars.colorGray} inset;
      background-color: ${vars.colorNavy98};
      color: ${vars.colorGray60};
      pointer-events: none;
      cursor: not-allowed;
    `;
    switch (theme) {
      case 'blue':
        return [
          baseDisabledStyles,
          css`
            color: ${vars.colorGray60};
          `,
          isActive && `color: ${vars.colorBlue};`,
        ];
      default:
        return baseDisabledStyles;
    }
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        box-shadow: ${vars.shadow9};
        background-color: ${vars.colorWhite};
        &:hover {
          background-color: ${vars.colorGray95};
        }
      `,
      isDisabled &&
        css`
          box-shadow: 0 0 0 1px ${vars.colorGray} inset;
          background-color: ${vars.colorNavy98};
          color: ${vars.colorGray60};
          pointer-events: none;
        `,
    ];
    switch (theme) {
      case 'blue':
        return [
          baseActiveStyles,
          css`
            color: ${vars.colorBlue};
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  return css`
    &:hover {
      box-shadow: ${vars.shadow8};
    }
    &:active {
      box-shadow: ${vars.shadow9};
      background-color: ${vars.colorWhite};
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
          color: ${vars.colorBlue};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/SecondaryButton: the specified theme '${theme}' is not supported.`
      );
      return css`
        &:hover {
          box-shadow: ${vars.shadow8};
        }
        &:active {
          box-shadow: ${vars.shadow9};
          background-color: ${vars.colorWhite};
        }
      `;
    }
  }
};

export { getStateStyles, getThemeStyles };
