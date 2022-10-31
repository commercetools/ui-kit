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

const getStateStyles = (
  isDisabled: TIconButtonProps['isDisabled'],
  isActive: boolean,
  theme: TIconButtonProps['theme']
) => {
  if (isDisabled) {
    const disabledStyle = css`
      background-color: ${designTokens.backgroundColorForButtonWhenDisabled};
      border-color: ${designTokens.borderColorForButtonAsIconWhenDisabled};
      color: ${designTokens.colorNeutral60};
      box-shadow: none;
    `;
    switch (theme) {
      case 'info':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${designTokens.colorInfo85};
              background-color: ${designTokens.colorInfo85};
            }
          `,
        ];
      case 'primary':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${designTokens.colorPrimary85};
              background-color: ${designTokens.colorPrimary85};
            }
          `,
        ];
      default:
        return disabledStyle;
    }
  }
  if (isActive) {
    const activeStyle = css`
      box-shadow: ${designTokens.shadowForButtonWhenActive};
      background-color: ${designTokens.colorSurface};
      border-color: ${designTokens.borderColorForButtonAsIcon};
      &:hover {
        box-shadow: ${designTokens.shadowForButtonWhenActive};
        background-color: ${designTokens.colorNeutral95};
        border-color: ${designTokens.colorNeutral95};
      }
    `;
    switch (theme) {
      case 'info':
        return [
          activeStyle,
          css`
            background-color: ${designTokens.colorInfo};
            border-color: ${designTokens.colorInfo};
            color: ${designTokens.colorSurface};
            &:hover {
              background-color: ${designTokens.colorInfo85};
              border-color: ${designTokens.colorInfo85};
            }
          `,
        ];
      case 'primary':
        return [
          activeStyle,
          css`
            background-color: ${designTokens.colorPrimary};
            color: ${designTokens.colorSurface};
            &:hover {
              background-color: ${designTokens.colorPrimary85};
              border-color: ${designTokens.colorPrimary85};
            }
          `,
        ];
      default:
        return activeStyle;
    }
  }
  return css`
    &:hover {
      box-shadow: ${designTokens.shadowForButtonWhenHovered};
    }
    &:active {
      box-shadow: ${designTokens.shadowForButtonWhenActive};
      background-color: ${designTokens.colorSurface};
      border-color: ${designTokens.colorSurface};
    }
  `;
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
const getThemeStyles = (theme: TIconButtonProps['theme']) => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'primary':
      return css`
        &:hover {
          background-color: ${designTokens.colorPrimary};
          border-color: ${designTokens.colorPrimary};
          color: ${designTokens.colorSurface};
        }
      `;
    case 'info':
      return css`
        &:hover {
          background-color: ${designTokens.colorInfo};
          border-color: ${designTokens.colorInfo};
          color: ${designTokens.colorSurface};
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
  getStateStyles,
  getHoverStyles,
  getShapeStyles,
  getSizeStyles,
  getThemeStyles,
  getIconThemeColor,
};
