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
        height: ${designTokens.heightForButtonAsMedium};
        border-radius: ${designTokens.borderRadiusForButtonAsMedium};
        padding: 0 ${designTokens.spacing20} 0 ${designTokens.spacing20};
      `;

    case 'big':
      return css`
        height: ${designTokens.heightForButtonAsBig};
        border-radius: ${designTokens.borderRadiusForButtonAsBig};
        padding: 0 ${designTokens.spacing30} 0 ${designTokens.spacing30};
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
          box-shadow: ${designTokens.shadowForButtonWhenDisabled};
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        &:hover,
        &:focus {
          box-shadow: ${designTokens.shadowForButtonWhenFocused};
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
      default:
        return baseActiveStyles;
    }
  }
  const baseDefaultStyles = [
    baseStyles,
    css`
      box-shadow: ${designTokens.shadowForButton};
      &:hover,
      &:focus {
        box-shadow: ${designTokens.shadowForButtonWhenFocused};
      }
      &:active {
        box-shadow: ${designTokens.shadowForButtonWhenActive};
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
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
