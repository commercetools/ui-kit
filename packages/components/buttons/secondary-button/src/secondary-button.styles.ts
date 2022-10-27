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
      box-shadow: ${designTokens.shadowForButtonWhenDisabled};
      background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
      border: none;
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
        border: ${designTokens.borderForButtonWhenActiveAsSecondary};
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        background-color: ${designTokens.colorSurface};
        &:focus,
        &:hover {
          background-color: ${designTokens.colorNeutral95};
        }
      `,
      isDisabled &&
        css`
          border: none;
          box-shadow: ${designTokens.shadowForButtonWhenDisabled};
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
      border: ${designTokens.borderForButtonWhenHoveredAsSecondary};
      box-shadow: ${designTokens.shadowForButtonWhenFocused};
    }
    &:active {
      border: ${designTokens.borderForButtonWhenActiveAsSecondary};
      box-shadow: ${designTokens.shadowForButtonWhenActive};
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
          box-shadow: ${designTokens.shadowForButtonWhenFocused};
        }
        &:active {
          box-shadow: ${designTokens.shadowForButtonWhenActive};
          background-color: ${designTokens.colorSurface};
        }
      `;
    }
  }
};

export { getStateStyles, getThemeStyles };
