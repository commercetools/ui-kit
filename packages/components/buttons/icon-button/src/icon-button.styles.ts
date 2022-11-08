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
            border-radius: ${designTokens.borderRadiusForButtonAsIconAsSmall};
          `;
        case 'medium':
          return css`
            border-radius: ${designTokens.borderRadiusForButtonAsIconAsMedium};
          `;
        case 'big':
          return css`
            border-radius: ${designTokens.borderRadiusForButtonAsIconAsBig};
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
        height: ${designTokens.heightForButtonAsIconAsSmall};
        width: ${designTokens.heightForButtonAsIconAsSmall};
      `;
    case 'medium':
      return css`
        height: ${designTokens.heightForButtonAsIconAsMedium};
        width: ${designTokens.heightForButtonAsIconAsMedium};
      `;
    case 'big':
      return css`
        height: ${designTokens.heightForButtonAsIconAsBig};
        width: ${designTokens.heightForButtonAsIconAsBig};
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
        border-color: ${designTokens.borderColorForButtonAsIconWhenDisabled};
        color: ${designTokens.colorNeutral60};
        box-shadow: none;
      }
    `;
  }

  if (!theme || theme === 'default') {
    return css`
      &:hover {
        background-color: ${designTokens.backgroundColorForButtonWhenHovered};
        box-shadow: ${designTokens.shadowForButtonWhenHovered};
      }
      ${isActive ? '&,' : ''}
      &:active {
        background-color: ${designTokens.backgroundColorForButtonWhenActive};
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        border-color: ${designTokens.borderColorForButtonAsIcon};
      }
    `;
  }

  switch (theme) {
    case 'primary':
      return css`
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonAsIconAsPrimaryWhenHovered};
          box-shadow: ${designTokens.shadowForButtonWhenHovered};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: ${designTokens.backgroundColorForButtonAsIconAsPrimaryWhenActive};
          box-shadow: ${designTokens.shadowForButtonWhenActive};
        }
        ${isActive ? '&,' : ''}
        &:hover,
        &:active {
          border-color: ${designTokens.borderColorForButtonAsIconAsPrimary};
        }
      `;
    case 'info':
      return css`
        &:hover {
          background-color: ${designTokens.backgroundColorForButtonAsIconAsInfoWhenHovered};
          box-shadow: ${designTokens.shadowForButtonWhenHovered};
        }
        ${isActive ? '&,' : ''}
        &:active {
          background-color: ${designTokens.backgroundColorForButtonAsIconAsInfoWhenActive};
          box-shadow: ${designTokens.shadowForButtonWhenActive};
        }
        ${isActive ? '&,' : ''}
        &:hover,
        &:active {
          border-color: ${designTokens.borderColorForButtonAsIconAsInfo};
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
