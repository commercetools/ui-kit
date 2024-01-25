/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TPrimaryButtonProps } from './primary-button';

const getSizeStyles = (size: TPrimaryButtonProps['size']) => {
  switch (size) {
    // rendering the same style for now to not introduce a breaking change
    case 'small':
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

const getButtonStyles = (
  isDisabled: TPrimaryButtonProps['isDisabled'],
  isActive: boolean,
  tone: TPrimaryButtonProps['tone'],
  size: TPrimaryButtonProps['size']
) => {
  const baseStyles = css`
    align-items: center;
    color: ${designTokens.colorSurface};
    transition: background-color ${designTokens.transitionLinear80Ms};
    padding: 0 var(--spacing-30);
    ${getSizeStyles(size)}
  `;
  // "disabled" takes precendece over "active"
  if (isDisabled) {
    return [
      baseStyles,
      css`
        &,
        &:active,
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
          color: ${designTokens.colorNeutral60};
          box-shadow: ${designTokens.shadow0};
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: ${designTokens.shadow0};
        &:hover,
        &:focus {
          box-shadow: ${designTokens.shadow0};
        }
      `,
    ];
    switch (tone) {
      case 'primary':
        return [
          baseActiveStyles,
          css`
            background-color: ${designTokens.backgroundColorForButtonAsPrimaryWhenActive};
            &:focus,
            &:hover {
              background-color: ${designTokens.backgroundColorForButtonAsPrimaryWhenHovered};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${designTokens.backgroundColorForButtonAsUrgentWhenActive};
            &:focus,
            &:hover {
              background-color: ${designTokens.backgroundColorForButtonAsUrgentWhenHovered};
            }
          `,
        ];
      case 'critical':
        return [
          baseActiveStyles,
          css`
            background-color: ${designTokens.backgroundColorForButtonAsCriticalWhenActive};
            &:focus,
            &:hover {
              background-color: ${designTokens.backgroundColorForButtonAsCriticalWhenHovered};
            }
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  const baseDefaultStyles = [
    baseStyles,
    css`
      box-shadow: ${designTokens.shadow0};
      &:hover,
      &:focus {
        box-shadow: ${designTokens.shadow0};
      }
      &:active {
        box-shadow: ${designTokens.shadow0};
      }
    `,
  ];
  switch (tone) {
    case 'primary':
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorPrimary};
          &:focus,
          &:hover {
            background-color: ${designTokens.backgroundColorForButtonAsPrimaryWhenHovered};
          }
          &:active {
            background-color: ${designTokens.backgroundColorForButtonAsPrimaryWhenActive};
          }
        `,
      ];
    case 'urgent':
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorWarning};
          &:focus,
          &:hover {
            background-color: ${designTokens.backgroundColorForButtonAsUrgentWhenHovered};
          }
          &:active {
            background-color: ${designTokens.backgroundColorForButtonAsUrgentWhenActive};
          }
        `,
      ];
    case 'critical':
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorError};
          &:focus,
          &:hover {
            background-color: ${designTokens.backgroundColorForButtonAsCriticalWhenHovered};
          }
          &:active {
            background-color: ${designTokens.backgroundColorForButtonAsCriticalWhenActive};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
