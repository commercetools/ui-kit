/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TPrimaryButtonProps } from './primary-button';

const getSizeStyles = (size: TPrimaryButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: ${customProperties.borderRadius4};
        padding: 0 ${customProperties.spacingS} 0 ${customProperties.spacingS};
        height: ${customProperties.smallButtonHeight};
      `;

    case 'big':
      return css`
        padding: 0 ${customProperties.spacingM} 0 ${customProperties.spacingM};
        height: ${customProperties.bigButtonHeight};
        border-radius: ${customProperties.borderRadius6};
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
    color: ${customProperties.colorSurface};
    transition: background-color ${customProperties.transitionLinear80Ms};
    font-size: ${customProperties.fontSizeDefault};
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
          background-color: ${customProperties.colorAccent98};
          color: ${customProperties.colorNeutral60};
          box-shadow: 0 0 0 1px ${customProperties.colorNeutral} inset;
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: ${customProperties.shadow9};
        &:hover,
        &:focus {
          box-shadow: ${customProperties.shadow8};
        }
      `,
    ];
    switch (tone) {
      case 'primary':
        return [
          baseActiveStyles,
          css`
            background-color: ${customProperties.colorPrimary};
            &:focus,
            &:hover {
              background-color: ${customProperties.colorPrimary25};
            }
            &:active {
              background-color: ${customProperties.colorPrimary};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${customProperties.colorWarning};
            &:focus,
            &:hover {
              background-color: ${customProperties.colorWarning};
            }
            &:active {
              background-color: ${customProperties.colorWarning};
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
      box-shadow: ${customProperties.shadow7};
      &:hover,
      &:focus {
        box-shadow: ${customProperties.shadow8};
      }
      &:active {
        box-shadow: ${customProperties.shadow9};
      }
    `,
  ];
  switch (tone) {
    case 'primary':
      return [
        baseDefaultStyles,
        css`
          background-color: ${customProperties.colorPrimary};
          &:focus,
          &:hover {
            background-color: ${customProperties.colorPrimary25};
          }
          &:active {
            background-color: ${customProperties.colorPrimary};
          }
        `,
      ];
    case 'urgent':
      return [
        baseDefaultStyles,
        css`
          background-color: ${customProperties.colorWarning};
          &:focus,
          &:hover {
            background-color: ${customProperties.colorPrimary25};
          }
          &:active {
            background-color: ${customProperties.colorWarning};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
