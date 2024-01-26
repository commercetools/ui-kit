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
      `;

    case 'big':
      return css`
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
    padding: ${designTokens.paddingForButton};
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
        // TODO: This custom colors where itroduced in the Merchant Center redign 2023
        // We need to check with designers if we want to introduce them in our color palette
        // They are 'color-primary' with 10% and 5% black opacity
        return [
          baseActiveStyles,
          css`
            background-color: #15a390;
            &:focus,
            &:hover {
              background-color: #17ab97;
            }
          `,
        ];
      case 'urgent':
        // TODO: This custom colors where itroduced in the Merchant Center redign 2023
        // We need to check with designers if we want to introduce them in our color palette
        // They are 'color-warning' with 10% and 5% black opacity
        return [
          baseActiveStyles,
          css`
            background-color: #dc630a;
            &:focus,
            &:hover {
              background-color: #e7680d;
            }
          `,
        ];
      case 'critical':
        // TODO: This custom colors where itroduced in the Merchant Center redign 2023
        // We need to check with designers if we want to introduce them in our color palette
        // They are 'color-error' with 10% and 5% black opacity
        return [
          baseActiveStyles,
          css`
            background-color: #b3003e;
            &:focus,
            &:hover {
              background-color: #cc0047;
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
      // TODO: This custom colors where itroduced in the Merchant Center redign 2023
      // We need to check with designers if we want to introduce them in our color palette
      // They are 'color-primary' with 10% and 5% black opacity
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorPrimary};
          &:focus,
          &:hover {
            background-color: #17ab97;
          }
          &:active {
            background-color: #15a390;
          }
        `,
      ];
    case 'urgent':
      // TODO: This custom colors where itroduced in the Merchant Center redign 2023
      // We need to check with designers if we want to introduce them in our color palette
      // They are 'color-warning' with 10% and 5% black opacity
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorWarning};
          &:focus,
          &:hover {
            background-color: #e7680d;
          }
          &:active {
            background-color: #dc630a;
          }
        `,
      ];
    case 'critical':
      // TODO: These custom colors where itroduced in the Merchant Center redign 2023
      // We need to check with designers if we want to introduce them in our color palette
      // They are 'color-error' with 10% and 5% black opacity
      return [
        baseDefaultStyles,
        css`
          background-color: ${designTokens.colorError};
          &:focus,
          &:hover {
            background-color: #cc0047;
          }
          &:active {
            background-color: #b3003e;
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
