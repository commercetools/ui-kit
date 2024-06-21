import { warning } from '@commercetools-uikit/utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import type { TIconButtonProps } from './icon-button';

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = (
  props: Pick<TIconButtonProps, 'theme' | 'isDisabled'>
) => {
  let iconColor: string = '';

  switch (true) {
    case props.isDisabled:
      iconColor = 'neutral60';
      break;
    case props.theme === 'primary':
      iconColor = 'surface';
      break;
    case props.theme === 'info':
      iconColor = 'surface';
      break;
    default:
      iconColor = 'primary';
  }

  return iconColor;
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
        case '10':
        case '20':
          return css`
            border-radius: ${designTokens.borderRadius2};
          `;
        case 'medium':
        case '30':
        case '40':
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
        height: ${designTokens.heightForButtonAs10};
        width: ${designTokens.heightForButtonAs10};
      `;
    case 'medium':
      return css`
        height: ${designTokens.heightForButtonAs30};
        width: ${designTokens.heightForButtonAs30};
      `;
    case 'big':
      return css`
        height: ${designTokens.heightForButtonAs40};
        width: ${designTokens.heightForButtonAs40};
      `;
    case '10':
      return css`
        height: ${designTokens.heightForButtonAs10};
        width: ${designTokens.heightForButtonAs10};
      `;
    case '20':
      return css`
        height: ${designTokens.heightForButtonAs20};
        width: ${designTokens.heightForButtonAs20};
      `;
    case '30':
      return css`
        height: ${designTokens.heightForButtonAs30};
        width: ${designTokens.heightForButtonAs30};
      `;
    case '40':
      return css`
        height: ${designTokens.heightForButtonAs40};
        width: ${designTokens.heightForButtonAs40};
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
        background-color: ${designTokens.colorTransparent};
        border-color: ${designTokens.colorSurface};
        color: ${designTokens.colorNeutral60};
        box-shadow: none;
      }
    `;
  }

  if (!theme || theme === 'default') {
    return css`
      background-color: transparent;
      &:hover {
        background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        box-shadow: ${designTokens.shadow0};
      }
      ${isActive ? '&,' : ''}
      &:active {
        background-color: ${designTokens.backgroundColorForButtonWhenActive};
        box-shadow: ${designTokens.shadow0};
        border-color: ${designTokens.borderColorForButtonAsSecondary};
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
        background-color: ${designTokens.colorPrimary};

        &:hover {
          background-color: ${designTokens.colorPrimary40};
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: ${designTokens.colorPrimary25};
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
        background-color: ${designTokens.colorInfo};

        &:hover {
          background-color: ${designTokens.colorInfo50};
          box-shadow: ${designTokens.shadow0};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: ${designTokens.colorInfo40};
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
