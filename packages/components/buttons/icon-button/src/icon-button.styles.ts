import { warning } from '@commercetools-uikit/utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import type { TIconButtonProps } from './icon-button';

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = (
  props: Pick<
    TIconButtonProps,
    'isToggleButton' | 'isToggled' | 'theme' | 'isDisabled' | 'icon'
  >
) => {
  const isActive = props.isToggleButton && props.isToggled;

  // if button has a theme, icon should be white when hovering/clicking
  if (props.theme !== 'default' && isActive) {
    if (props.isDisabled) {
      return 'neutral60';
    }
    return 'surface';
  }

  // if button is disabled, icon should be neutral60
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.icon?.props.theme;
};

const getShapeStyles = (
  shape: TIconButtonProps['shape'],
  size: TIconButtonProps['size']
) => {
  switch (shape) {
    case 'round':
      return css`
        border-radius: 50%;
      `;
    case 'square':
      switch (size) {
        case 'small':
          return css`
            border-radius: ${designTokens.borderRadius2};
          `;
        case 'medium':
        case 'big':
          return css`
            border-radius: ${designTokens.borderRadius4};
          `;
        default:
          return css``;
      }
    default:
      return css``;
  }
};
const getSizeStyles = (size: TIconButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        height: ${designTokens.heightForButtonAsSmall};
        width: ${designTokens.heightForButtonAsSmall};
      `;
    case 'medium':
      return css`
        height: ${designTokens.heightForButtonAsMedium};
        width: ${designTokens.heightForButtonAsMedium};
      `;
    case 'big':
      return css`
        height: ${designTokens.heightForButtonAsBig};
        width: ${designTokens.heightForButtonAsBig};
      `;
    default:
      return css``;
  }
};

const getBaseStyles = (
  theme: TIconButtonProps['theme'],
  isDisabled: TIconButtonProps['isDisabled'],
  isActive: boolean
) => {
  if (isDisabled) {
    return css`
      &,
      &:hover {
        background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
        border-color: ${designTokens.colorSurface};
        color: ${designTokens.colorNeutral60};
        box-shadow: none;
      }
    `;
  }

  if (!theme || theme === 'default') {
    return css`
      &:hover {
        background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        box-shadow: ${designTokens.shadow0};
      }
      ${isActive ? '&,' : ''}
      &:active {
        background-color: ${designTokens.backgroundColorForButtonWhenActive};
        box-shadow: ${designTokens.shadow0};
        border-color: ${designTokens.colorNeutral};
      }
    `;
  }

  switch (theme) {
    // TODO: These custom colors where itroduced in the Merchant Center redign 2023
    // We need to check with designers if we want to introduce them in our color palette
    // #15A390 -> color-primary with 10% black opacity
    // #057FCC -> color-info with 10% black opacity
    case 'primary':
      return css`
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonAsPrimaryWhenHovered};
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: ${designTokens.backgroundColorForButtonAsPrimary};
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:hover,
        &:active {
          border-color: ${designTokens.colorNeutral};
        }
      `;
    case 'info':
      return css`
        &:hover {
          background-color: ${designTokens.colorInfo};
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: #057fcc;
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:hover,
        &:active {
          border-color: ${designTokens.colorNeutral};
        }
      `;
    default: {
      warning(
        false,
        `ui-kit/IconButton: the specified theme '${theme}' is not supported.`
      );
      return css``;
    }
  }
};

const getHoverStyles = (
  isDisabled: TIconButtonProps['isDisabled'],
  theme: TIconButtonProps['theme']
) => {
  if (theme === 'default' || isDisabled) return css``;

  return css`
    &:hover {
      * {
        fill: ${designTokens.colorSurface};
      }
    }
  `;
};

export {
  getHoverStyles,
  getShapeStyles,
  getSizeStyles,
  getBaseStyles,
  getIconThemeColor,
};
