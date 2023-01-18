import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: 0 ${designTokens.spacing20} 0 ${designTokens.spacing20};
      height: ${designTokens.heightForViewSwitcherWhenCondensed};
    `;
  }

  return css`
    padding: 0 ${designTokens.spacing30} 0 ${designTokens.spacing30};
    height: ${designTokens.heightForViewSwitcher};
  `;
};

const getFontColor = (isDisabled?: boolean, isActive?: boolean) => {
  if (isDisabled) return designTokens.fontColorForViewSwitcherWhenDisabled;
  if (isActive) return designTokens.fontColorForViewSwitcherWhenSelected;
  return designTokens.fontColorForViewSwitcher;
};

export const getButtonStyles = (
  isDisabled?: TViewSwitcherButtonProps['isDisabled'],
  isActive?: TViewSwitcherButtonProps['isActive'],
  isCondensed?: TViewSwitcherButtonProps['isCondensed'],
  isFirstButton?: TViewSwitcherButtonProps['isFirstButton'],
  isLastButton?: TViewSwitcherButtonProps['isLastButton']
) => {
  const borderRadius = `${
    isFirstButton ? designTokens.borderRadiusForViewSwitcher : '0'
  } ${
    isLastButton
      ? `${designTokens.borderRadiusForViewSwitcher} ${designTokens.borderRadiusForViewSwitcher}`
      : '0 0'
  } ${isFirstButton ? designTokens.borderRadiusForViewSwitcher : '0'}`;

  const fontColor = getFontColor(isDisabled, isActive);

  return [
    css`
      align-items: center;
      color: ${fontColor};
      fill: ${fontColor};
      transition: background-color ${designTokens.transitionLinear80Ms};
      font-size: ${designTokens.fontSizeDefault};
      border-radius: ${borderRadius};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24),
        0 -1px 1px 0 rgba(0, 0, 0, 0.12);
      background-color: ${designTokens.colorSurface};
      &:hover {
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenHovered};
      }
      &:active {
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenSelected};
      }
      ${getSizeStyles(isCondensed)}
    `,
    isActive &&
      css`
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenSelected};
        box-shadow: ${designTokens.shadow9};
      `,
    isDisabled &&
      css`
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenDisabled};
        color: ${designTokens.colorNeutral60};
        &:hover {
          background-color: ${designTokens.backgroundColorForViewSwitcherWhenDisabled};
        }
      `,
  ];
};
