import type { Theme } from '@emotion/react';

import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TSecondaryButtonProps } from './secondary-button';

const getStateStyles = (
  isDisabled: boolean,
  isActive: boolean,
  tone: TSecondaryButtonProps['tone']
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
        color: ${designTokens.fontColorForButtonAsSecondary};

        * {
          fill: ${designTokens.fontColorForButtonAsSecondary};
        }
        border: 1px solid ${designTokens.borderColorForButtonAsSecondary};
        box-shadow: ${designTokens.shadow0};
        background-color: ${designTokens.colorPrimary90};
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonWhenActive};
        }
      `,
    ];
    switch (tone) {
      case 'info':
        return [
          baseActiveStyles,
          css`
            color: ${designTokens.colorSolid};
            border-color: ${designTokens.colorInfo85};
            background-color: ${designTokens.colorInfo85};
            * {
              fill: ${designTokens.colorSolid};
            }
            &:hover {
              background-color: ${designTokens.colorInfo85};
            }
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  return css`
    color: ${designTokens.fontColorForButtonAsSecondary};

    * {
      fill: ${designTokens.fontColorForButtonAsSecondary};
    }
    &:not(:focus),
    &:not(:hover),
    &:not(:active) {
      border: 1px solid ${designTokens.borderColorForButtonAsSecondary};
    }
    &:focus,
    &:hover {
      border: 1px solid ${designTokens.borderColorForButtonAsSecondary};
      box-shadow: ${designTokens.shadow0};
    }
    &:hover {
      background-color: ${designTokens.backgroundColorForButtonWhenHovered};
    }
    &:active {
      border: 1px solid ${designTokens.borderColorForButtonAsSecondary};
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
        height: ${designTokens.heightForButtonAsMedium};
      `;

    case 'big':
      return css`
        height: ${designTokens.heightForButtonAsBig};
      `;

    default:
      return css``;
  }
};

const getToneStyles = (
  tone: TSecondaryButtonProps['tone'],
  isDisabled: boolean,
  isActive: boolean
) => {
  switch (tone) {
    case 'info':
      return [
        !isDisabled &&
          !isActive &&
          css`
            background-color: ${designTokens.colorInfo95};
            border-color: ${designTokens.colorInfo85} !important;
            color: ${designTokens.colorSolid};

            * {
              fill: ${designTokens.colorSolid};
            }

            &:hover {
              background-color: ${designTokens.colorInfo90};
              border-color: ${designTokens.colorInfo85};
            }
            &:focus {
              border-color: ${designTokens.colorInfo85};
            }
            &:active {
              background-color: ${designTokens.colorInfo85};
              border-color: ${designTokens.colorInfo85};
            }
          `,
      ];

    default:
      return css``;
  }
};

export { getStateStyles, getThemeStyles, getSizeStyles, getToneStyles };
