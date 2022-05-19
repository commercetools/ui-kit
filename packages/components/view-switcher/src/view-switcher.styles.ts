import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import type { TViewSwitcherButtonProps } from './view-switcher-button';

const getSizeStyles = (
  isCondensed: TViewSwitcherButtonProps['isCondensed']
) => {
  if (isCondensed) {
    return css`
      padding: 0 ${vars.spacingS} 0 ${vars.spacingS};
      height: ${vars.smallButtonHeight};
    `;
  }

  return css`
    padding: 0 ${vars.spacingM} 0 ${vars.spacingM};
    height: ${vars.bigButtonHeight};
  `;
};

const getButtonStyles = (
  isDisabled?: TViewSwitcherButtonProps['isDisabled'],
  isActive?: TViewSwitcherButtonProps['isActive'],
  isCondensed?: TViewSwitcherButtonProps['isCondensed'],
  isFirstButton?: TViewSwitcherButtonProps['isFirstButton'],
  isLastButton?: TViewSwitcherButtonProps['isLastButton']
) => {
  const borderRadius = `${isFirstButton ? vars.borderRadius6 : '0'} ${
    isLastButton ? `${vars.borderRadius6} ${vars.borderRadius6}` : '0 0'
  } ${isFirstButton ? vars.borderRadius6 : '0'}`;

  const baseStyles = css`
    align-items: center;
    color: ${vars.colorSolid};
    transition: background-color ${vars.transitionLinear80Ms};
    font-size: ${vars.fontSizeDefault};
    border-radius: ${borderRadius};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24),
      0 -1px 1px 0 rgba(0, 0, 0, 0.12);
    &:focus {
      border: ${vars.borderRadius1} solid ${vars.colorInfo};
    }
    &:hover {
      background-color: ${vars.colorNeutral90};
    }
    &:active {
      background-color: ${vars.colorNeutral95};
    }
    ${getSizeStyles(isCondensed)}
  `;
  // "disabled" takes precedence over "active"
  if (isDisabled) {
    return [
      baseStyles,
      css`
        background-color: ${vars.colorAccent98};
        color: ${vars.colorNeutral60};
      `,
    ];
  }
  if (isActive) {
    return [
      baseStyles,
      css`
        background-color: ${vars.colorNeutral95};
        box-shadow: ${vars.shadow9};
      `,
    ];
  }

  return baseStyles;
};

export { getButtonStyles };
