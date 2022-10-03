/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TPrimaryButtonProps } from './primary-button';

const getSizeStyles = (size: TPrimaryButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: ${designTokens.borderRadius4};
        padding: 0 ${designTokens.spacingS} 0 ${designTokens.spacingS};
        height: ${designTokens.smallButtonHeight};
      `;

    case 'big':
      return css`
        padding: 0 ${designTokens.spacingM} 0 ${designTokens.spacingM};
        height: ${designTokens.bigButtonHeight};
        border-radius: ${designTokens.borderRadius6};
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
    font-size: ${designTokens.fontSizeDefault};
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
          background-color: ${designTokens.colorAccent98};
          color: ${designTokens.colorNeutral60};
          box-shadow: 0 0 0 1px ${designTokens.colorNeutral} inset;
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: ${designTokens.shadow9};
        &:hover,
        &:focus {
          box-shadow: ${designTokens.shadow8};
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
      box-shadow: ${designTokens.shadow7};
      &:hover,
      &:focus {
        box-shadow: ${designTokens.shadow8};
      }
      &:active {
        box-shadow: ${designTokens.shadow9};
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
