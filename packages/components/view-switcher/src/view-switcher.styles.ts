import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: ${designTokens.paddingForViewSwitcherWhenCondensed};
      height: ${designTokens.heightForViewSwitcherWhenCondensed};
    `;
  }

  return css`
    padding: ${designTokens.paddingForViewSwitcher};
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
      border: ${designTokens.borderForViewSwitcher};
      border-left: ${isFirstButton ? designTokens.borderForViewSwitcher : '0'};
      border-radius: ${borderRadius};
      box-shadow: ${designTokens.boxShadowForViewSwitcher};
      background-color: ${designTokens.backgroundColorForViewSwitcher};
      &:hover {
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenHovered};
      }
      &:active {
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenSelected};
      }
      ${getSizeStyles(isCondensed)}
    `,
    isDisabled &&
      css`
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenDisabled};
        color: ${designTokens.fontColorForViewSwitcherWhenDisabled};
        &:hover {
          background-color: ${designTokens.backgroundColorForViewSwitcherWhenDisabled};
        }
      `,
    isActive &&
      css`
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenSelected};
        box-shadow: ${designTokens.boxShadowForViewSwitcherWhenSelected};
      `,
  ];
};
