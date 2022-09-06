import type { Theme } from '@emotion/react';

import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const getStateStyles = (
  isDisabled: boolean,
  isActive: boolean,
  theme: Theme
) => {
  if (isDisabled) {
    const baseDisabledStyles = css`
      box-shadow: 0 0 0 1px ${designTokens.colorNeutral} inset;
      background-color: ${designTokens.colorAccent98};
      color: ${designTokens.colorNeutral60};
    `;
    switch (theme) {
      case 'info':
        return [
          baseDisabledStyles,
          css`
            color: ${designTokens.colorNeutral60};
          `,
          isActive && `color: ${designTokens.colorInfo};`,
        ];
      default:
        return baseDisabledStyles;
    }
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        box-shadow: ${designTokens.shadow9};
        background-color: ${designTokens.colorSurface};
        &:focus,
        &:hover {
          background-color: ${designTokens.colorNeutral95};
        }
      `,
      isDisabled &&
        css`
          box-shadow: 0 0 0 1px ${designTokens.colorNeutral} inset;
          background-color: ${designTokens.colorAccent98};
          color: ${designTokens.colorNeutral60};
        `,
    ];
    switch (theme) {
      case 'info':
        return [
          baseActiveStyles,
          css`
            color: ${designTokens.colorInfo};
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  return css`
    &:focus,
    &:hover {
      box-shadow: ${designTokens.shadow8};
    }
    &:active {
      box-shadow: ${designTokens.shadow9};
      background-color: ${designTokens.colorSurface};
    }
  `;
};

const getThemeStyles = (theme: Theme) => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'info':
      return css`
        &:focus,
        &:hover {
          color: ${designTokens.colorInfo};

          * {
            fill: ${designTokens.colorInfo};
          }
        }
      `;
    default: {
      warning(
        false,
        `ui-kit/SecondaryButton: the specified theme '${theme}' is not supported.`
      );
      return css`
        &:focus,
        &:hover {
          box-shadow: ${designTokens.shadow8};
        }
        &:active {
          box-shadow: ${designTokens.shadow9};
          background-color: ${designTokens.colorSurface};
        }
      `;
    }
  }
};

export { getStateStyles, getThemeStyles };
