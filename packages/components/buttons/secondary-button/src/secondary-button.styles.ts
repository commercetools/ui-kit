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
      box-shadow: ${designTokens.shadow0};
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
        border: 1px solid ${designTokens.colorNeutral};
        box-shadow: ${designTokens.shadow0};
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
      border: 1px solid var(--color-neutral);
      box-shadow: ${designTokens.shadow0};
    }
    &:hover {
      background-color: ${designTokens.backgroundColorForButtonWhenHovered};
    }
    &:active {
      border: 1px solid var(--color-neutral);
      box-shadow: ${designTokens.shadow0};
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
          box-shadow: ${designTokens.shadow0};
          background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        }
        &:active {
          box-shadow: ${designTokens.shadow0};
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
      `;
    }
  }
};

const getSizeStyles = (size: TSecondaryButtonProps['size']) => {
  switch (size) {
    case 'medium':
      return css`
        height: 32px;
        border-radius: ${designTokens.borderRadiusForButtonAsMedium};
      `;

    case 'big':
      return css`
        height: 40px;
        border-radius: ${designTokens.borderRadiusForButtonAsBig};
      `;

    default:
      return css``;
  }
};

const getToneStyles = (
  tone: TSecondaryButtonProps['tone'],
  isDisabled: boolean
) => {
  switch (tone) {
    case 'info':
      return [
        !isDisabled &&
          css`
            background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfo};
            border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            &:hover {
              background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfoAndHovered};
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
            &:focus {
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
            &:active {
              background-color: ${designTokens.backgroundColorForButtonAsSecondaryWhenInfoAndActive};
              border-color: ${designTokens.borderColorForButtonAsSecondaryWhenInfo};
            }
          `,
      ];

    default:
      return css``;
  }
};

export { getStateStyles, getThemeStyles, getSizeStyles, getToneStyles };
