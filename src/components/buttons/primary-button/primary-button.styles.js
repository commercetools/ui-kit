import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getButtonLayoutStyles = size => {
  const baseLayoutStyles = css`
    display: inline-flex;
    align-items: center;
    color: ${vars['--color-white']};
    transition: background-color ${vars['--transition-linear-80ms']};
  `;
  switch (size) {
    case 'small':
      return [
        baseLayoutStyles,
        css`
          border-radius: ${vars['--border-radius-4']};
          > button {
            padding: 0 ${vars['--spacing-8']} 0 ${vars['--spacing-8']};
            height: ${vars['--small-button-height']};
            border-radius: ${vars['--border-radius-4']};
          }
        `,
      ];
    case 'big':
      return [
        baseLayoutStyles,
        css`
          border-radius: ${vars['--border-radius-6']};
          > button {
            padding: 0 ${vars['--spacing-16']} 0 ${vars['--spacing-16']};
            height: ${vars['--big-button-height']};
            border-radius: ${vars['--border-radius-6']};
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
    font-size: ${vars['--font-size-default']};
  `;
  // "disabled" takes precendece over "active"
  if (isDisabled) {
    return [
      baseStyles,
      css`
        &,
        &:active,
        &:hover {
          background-color: ${vars['--color-navy-98']};
          color: ${vars['--color-gray-60']};
          box-shadow: 0 0 0 1px ${vars['--color-gray']} inset;
        }
      `,
    ];
  }
  if (isActive) {
    const baseActiveStyles = [
      baseStyles,
      css`
        box-shadow: inset ${vars['--shadow-7-first']},
          inset ${vars['--shadow-7-second']};
        &:hover,
        &:focus {
          box-shadow: ${vars['--shadow-8']};
        }
      `,
    ];
    switch (tone) {
      case 'primary':
        return [
          baseActiveStyles,
          css`
            background-color: ${vars['--color-green']};
            &:hover {
              background-color: ${vars['--color-green-25']};
            }
            &:active {
              background-color: ${vars['--color-green']};
            }
          `,
        ];
      case 'urgent':
        return [
          baseActiveStyles,
          css`
            background-color: ${vars['--color-orange']};
            &:hover {
              background-color: ${vars['--color-orange']};
            }
            &:active {
              background-color: ${vars['--color-orange']};
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
      box-shadow: ${vars['--shadow-7']};
      &:hover,
      &:focus {
        box-shadow: ${vars['--shadow-8']};
      }
      &:active {
        box-shadow: inset ${vars['--shadow-7-first']},
          inset ${vars['--shadow-7-second']};
      }
    `,
  ];
  switch (tone) {
    case 'primary':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars['--color-green']};
          &:hover {
            background-color: ${vars['--color-green-25']};
          }
          &:active {
            background-color: ${vars['--color-green']};
          }
        `,
      ];
    case 'urgent':
      return [
        baseDefaultStyles,
        css`
          background-color: ${vars['--color-orange']};
          &:hover {
            background-color: ${vars['--color-green-25']};
          }
          &:active {
            background-color: ${vars['--color-orange']};
          }
        `,
      ];
    default:
      return baseDefaultStyles;
  }
};

export { getButtonLayoutStyles, getButtonStyles };
