import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: 0 ${customProperties.spacingS} 0 ${customProperties.spacingS};
      height: ${customProperties.smallButtonHeight};
    `;
  }

  return css`
    padding: 0 ${customProperties.spacingM} 0 ${customProperties.spacingM};
    height: ${customProperties.bigButtonHeight};
  `;
};

export const getButtonStyles = (
  isDisabled?: TViewSwitcherButtonProps['isDisabled'],
  isActive?: TViewSwitcherButtonProps['isActive'],
  isCondensed?: TViewSwitcherButtonProps['isCondensed'],
  isFirstButton?: TViewSwitcherButtonProps['isFirstButton'],
  isLastButton?: TViewSwitcherButtonProps['isLastButton']
) => {
  const borderRadius = `${
    isFirstButton ? customProperties.borderRadius6 : '0'
  } ${
    isLastButton
      ? `${customProperties.borderRadius6} ${customProperties.borderRadius6}`
      : '0 0'
  } ${isFirstButton ? customProperties.borderRadius6 : '0'}`;

  return [
    css`
      align-items: center;
      color: ${customProperties.colorSolid};
      transition: background-color ${customProperties.transitionLinear80Ms};
      font-size: ${customProperties.fontSizeDefault};
      border-radius: ${borderRadius};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24),
        0 -1px 1px 0 rgba(0, 0, 0, 0.12);
      &:hover {
        background-color: ${customProperties.colorNeutral90};
      }
      &:active {
        background-color: ${customProperties.colorNeutral95};
      }
      ${getSizeStyles(isCondensed)}
    `,
    isActive &&
      css`
        background-color: ${customProperties.colorNeutral95};
        box-shadow: ${customProperties.shadow9};
      `,
    isDisabled &&
      css`
        background-color: ${customProperties.colorAccent98};
        color: ${customProperties.colorNeutral60};
        &:hover {
          background-color: ${customProperties.colorAccent98};
        }
      `,
  ];
};
