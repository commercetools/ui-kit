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
  if (isActive) return designTokens.fontColorForButtonAsSecondary;
  return designTokens.fontColorForViewSwitcherButton;
};

export const getButtonStyles = (
  isDisabled?: TViewSwitcherButtonProps['isDisabled'],
  isActive?: TViewSwitcherButtonProps['isActive'],
  isCondensed?: TViewSwitcherButtonProps['isCondensed'],
  isFirstButton?: TViewSwitcherButtonProps['isFirstButton'],
  isLastButton?: TViewSwitcherButtonProps['isLastButton']
) => {
  const borderRadius = `${isFirstButton ? designTokens.borderRadius4 : '0'} ${
    isLastButton ? `${designTokens.borderRadius4}` : '0 0'
  } ${isFirstButton ? designTokens.borderRadius4 : '0'}`;

  const fontColor = getFontColor(isDisabled, isActive);

  return [
    css`
      align-items: center;
      color: ${fontColor};
      fill: ${fontColor};
      transition: background-color ${designTokens.transitionLinear80Ms};
      font-size: ${designTokens.fontSize30};
      border: 1px solid ${designTokens.borderColorForButtonAsSecondary};
      border-left: ${isFirstButton
        ? `1px solid ${designTokens.borderColorForButtonAsSecondary}`
        : '0'};
      border-radius: ${borderRadius};
      box-shadow: ${designTokens.shadow0};
      background-color: ${designTokens.colorSurface};
      &:hover {
        background-color: ${designTokens.backgroundColorForButtonWhenHovered};
      }
      &:active {
        background-color: ${designTokens.backgroundColorForButtonWhenActive};
      }
      ${getSizeStyles(isCondensed)}
    `,
    isDisabled &&
      css`
        background-color: ${designTokens.colorSurface};
        color: ${designTokens.colorNeutral60};
        &:hover {
          background-color: ${designTokens.colorSurface};
        }
        border-color: ${designTokens.colorNeutral};
      `,
    isActive &&
      css`
        background-color: ${designTokens.backgroundColorForButtonWhenActive};
        box-shadow: ${designTokens.shadow0};
      `,
  ];
};
