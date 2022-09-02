import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: 0 ${designTokens.spacingS} 0 ${designTokens.spacingS};
      height: ${designTokens.smallButtonHeight};
    `;
  }

  return css`
    padding: 0 ${designTokens.spacingM} 0 ${designTokens.spacingM};
    height: ${designTokens.bigButtonHeight};
  `;
};

export const getButtonStyles = (
  isDisabled?: TViewSwitcherButtonProps['isDisabled'],
  isActive?: TViewSwitcherButtonProps['isActive'],
  isCondensed?: TViewSwitcherButtonProps['isCondensed'],
  isFirstButton?: TViewSwitcherButtonProps['isFirstButton'],
  isLastButton?: TViewSwitcherButtonProps['isLastButton']
) => {
  const borderRadius = `${isFirstButton ? designTokens.borderRadius6 : '0'} ${
    isLastButton
      ? `${designTokens.borderRadius6} ${designTokens.borderRadius6}`
      : '0 0'
  } ${isFirstButton ? designTokens.borderRadius6 : '0'}`;

  return [
    css`
      align-items: center;
      color: ${designTokens.colorSolid};
      transition: background-color ${designTokens.transitionLinear80Ms};
      font-size: ${designTokens.fontSizeDefault};
      border-radius: ${borderRadius};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24),
        0 -1px 1px 0 rgba(0, 0, 0, 0.12);
      &:hover {
        background-color: ${designTokens.colorNeutral90};
      }
      &:active {
        background-color: ${designTokens.colorNeutral95};
      }
      ${getSizeStyles(isCondensed)}
    `,
    isActive &&
      css`
        background-color: ${designTokens.colorNeutral95};
        box-shadow: ${designTokens.shadow9};
      `,
    isDisabled &&
      css`
        background-color: ${designTokens.colorAccent98};
        color: ${designTokens.colorNeutral60};
        &:hover {
          background-color: ${designTokens.colorAccent98};
        }
      `,
  ];
};
