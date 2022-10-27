/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TPrimaryButtonProps } from './primary-button';

const getSizeStyles = (size: TPrimaryButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: ${designTokens.borderRadiusForButtonAsSmall};
        padding: 0 ${designTokens.spacingS} 0 ${designTokens.spacingS};
        height: ${designTokens.heightForButtonAsSmall};
      `;

    case 'big':
      return css`
        padding: 0 ${designTokens.spacingM} 0 ${designTokens.spacingM};
        height: ${designTokens.heightForButtonAsBig};
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
            background-color: ${designTokens.colorPrimary};
            &:focus,
            &:hover {
              background-color: ${designTokens.colorPrimary25};
            }
            &:active {
              background-color: ${designTokens.colorPrimary};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${designTokens.colorWarning};
            &:focus,
            &:hover {
              background-color: ${designTokens.colorWarning};
            }
            &:active {
              background-color: ${designTokens.colorWarning};
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
            background-color: ${designTokens.colorPrimary25};
          }
          &:active {
            background-color: ${designTokens.colorPrimary};
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
            background-color: ${designTokens.colorPrimary25};
          }
          &:active {
            background-color: ${designTokens.colorWarning};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
