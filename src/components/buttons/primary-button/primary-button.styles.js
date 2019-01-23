import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getButtonLayoutStyles = size => {
  const baseLayoutStyles = css`
    display: inline-flex;
    align-items: center;
    color: ${vars.colorWhite};
    transition: background-color ${vars.transitionLinear80Ms};
  `;
  switch (size) {
    case 'small':
      return [
        baseLayoutStyles,
        css`
          border-radius: ${vars.borderRadius4};
          > button {
            padding: 0 ${vars.spacing8} 0 ${vars.spacing8};
            height: ${vars.smallButtonHeight};
            border-radius: ${vars.borderRadius4};
          }
        `,
      ];
    case 'big':
      return [
        baseLayoutStyles,
        css`
          border-radius: ${vars.borderRadius6};
          > button {
            padding: 0 ${vars.spacing16} 0 ${vars.spacing16};
            height: ${vars.bigButtonHeight};
            border-radius: ${vars.borderRadius6};
          }
        `,
      ];
    default:
      return css``;
  }
};
const getButtonStyles = (isDisabled, isActive, tone) => {
  const baseStyles = css`
    display: flex;
    align-items: center;
    font-size: ${vars.fontSizeDefault};
  `;
  // "disabled" takes precendece over "active"
  if (isDisabled) {
    return [
      baseStyles,
      css`
        &,
        &:active,
        &:hover {
          background-color: ${vars.colorNavy98};
          color: ${vars.colorGray60};
          box-shadow: 0 0 0 1px ${vars.colorGray} inset;
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: inset ${vars.shadow7First}, inset ${vars.shadow7Second};
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
            background-color: ${vars.colorGreen};
            &:hover {
              background-color: ${vars.colorGreen25};
            }
            &:active {
              background-color: ${vars.colorGreen};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${vars.colorOrange};
            &:hover {
              background-color: ${vars.colorOrange};
            }
            &:active {
              background-color: ${vars.colorOrange};
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
        box-shadow: inset ${vars.shadow7First}, inset ${vars.shadow7Second};
      }
    `,
  ];
  switch (tone) {
    case 'primary':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars.colorGreen};
          &:hover {
            background-color: ${vars.colorGreen25};
          }
          &:active {
            background-color: ${vars.colorGreen};
          }
        `,
      ];
    case 'urgent':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars.colorOrange};
          &:hover {
            background-color: ${vars.colorGreen25};
          }
          &:active {
            background-color: ${vars.colorOrange};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonLayoutStyles, getButtonStyles };
