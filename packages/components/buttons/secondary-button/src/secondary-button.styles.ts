import type { Theme } from '@emotion/react';

import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TSecondaryButtonProps } from './secondary-button';

const getStateStyles = (
  isDisabled: boolean,
  isActive: boolean,
  theme: Theme
) => {
  if (isDisabled) {
    return css`
      box-shadow: ${designTokens.shadowForButtonWhenDisabled};
      background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
      border: none;
      color: ${designTokens.colorNeutral60};
      &:focus,
      &:hover {
        color: ${designTokens.colorNeutral60};

        * {
          fill: ${designTokens.colorNeutral60};
        }
      }
    `;
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        border: ${designTokens.borderForButtonAsSecondaryWhenActive};
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        background-color: ${designTokens.colorSurface};
        &:focus,
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
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
      border: ${designTokens.borderForButtonAsSecondaryWhenHovered};
      box-shadow: ${designTokens.shadowForButtonWhenFocused};
    }
    &:hover {
      background-color: ${designTokens.backgroundColorForButtonWhenHovered};
    }
    &:active {
      border: ${designTokens.borderForButtonAsSecondaryWhenActive};
      box-shadow: ${designTokens.shadowForButtonWhenActive};
      background-color: ${designTokens.backgroundColorForButtonWhenActive};
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
          background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        }
        &:active {
          box-shadow: ${designTokens.shadowForButtonWhenActive};
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
      `;
    }
  }
};

const getSizeStyles = (size: TSecondaryButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: ${designTokens.borderRadiusForButtonAsSmall};
        padding: 0 ${designTokens.spacing20} 0 ${designTokens.spacing20};
        height: ${designTokens.heightForButtonAsSmall};
      `;

    case 'big':
      return css`
        padding: 0 ${designTokens.spacing30} 0 ${designTokens.spacing30};
        height: ${designTokens.heightForButtonAsBig};
        border-radius: ${designTokens.borderRadiusForButtonAsBig};
      `;

    default:
      return css``;
  }
};

export { getStateStyles, getThemeStyles, getSizeStyles };
