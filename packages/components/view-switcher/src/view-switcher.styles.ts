import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: 0 ${designTokens.spacing25};
      height: 32px;
    `;
  }

  return css`
    padding: 0 ${designTokens.spacing30};
    height: 40px;
  `;
};

const getFontColor = (isDisabled?: boolean, isActive?: boolean) => {
  if (isDisabled) return designTokens.colorNeutral60;
  if (isActive) return designTokens.colorSolid;
  return designTokens.colorNeutral40;
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
      border: 1px solid var(--color-neutral);
      border-left: ${isFirstButton ? '1px solid var(--color-neutral)' : '0'};
      border-radius: ${borderRadius};
      box-shadow: ${designTokens.shadow0};
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
        color: ${designTokens.colorNeutral60};
        &:hover {
          background-color: ${designTokens.backgroundColorForViewSwitcherWhenDisabled};
        }
      `,
    isActive &&
      css`
        background-color: ${designTokens.backgroundColorForViewSwitcherWhenSelected};
        box-shadow: ${designTokens.shadow0};
      `,
  ];
};
