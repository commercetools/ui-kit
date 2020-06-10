/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: ${vars.borderRadius4};
        padding: 0 ${vars.spacingS} 0 ${vars.spacingS};
        height: ${vars.smallButtonHeight};
      `;

    case 'big':
      return css`
        padding: 0 ${vars.spacingM} 0 ${vars.spacingM};
        height: ${vars.bigButtonHeight};
        border-radius: ${vars.borderRadius6};
      `;

    default:
      return css``;
  }
};

const getButtonStyles = (isDisabled, isActive, tone, size) => {
  const baseStyles = css`
    align-items: center;
    color: ${vars.colorSurface};
    transition: background-color ${vars.transitionLinear80Ms};
    font-size: ${vars.fontSizeDefault};
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
          background-color: ${vars.colorAccent98};
          color: ${vars.colorNeutral60};
          box-shadow: 0 0 0 1px ${vars.colorNeutral} inset;
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: ${vars.shadow9};
        &:hover,
        &:focus {
          box-shadow: ${vars.shadow8};
        }
      `,
    ];
    switch (tone) {
      case 'primary':
        return [
          baseActiveStyles,
          css`
            background-color: ${vars.colorPrimary};
            &:focus,
            &:hover {
              background-color: ${vars.colorPrimary25};
            }
            &:active {
              background-color: ${vars.colorPrimary};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${vars.colorWarning};
            &:focus,
            &:hover {
              background-color: ${vars.colorWarning};
            }
            &:active {
              background-color: ${vars.colorWarning};
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
      box-shadow: ${vars.shadow7};
      &:hover,
      &:focus {
        box-shadow: ${vars.shadow8};
      }
      &:active {
        box-shadow: ${vars.shadow9};
      }
    `,
  ];
  switch (tone) {
    case 'primary':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars.colorPrimary};
          &:focus,
          &:hover {
            background-color: ${vars.colorPrimary25};
          }
          &:active {
            background-color: ${vars.colorPrimary};
          }
        `,
      ];
    case 'urgent':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars.colorWarning};
          &:focus,
          &:hover {
            background-color: ${vars.colorPrimary25};
          }
          &:active {
            background-color: ${vars.colorWarning};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonStyles };
