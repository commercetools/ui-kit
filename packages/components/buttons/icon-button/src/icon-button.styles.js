import { invariant } from '@commercetools-uikit/utils';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';

const buttonSizes = {
  small: '16px',
  medium: '24px',
  big: '32px',
};

const getStateStyles = (isDisabled, isActive, theme) => {
  if (isDisabled) {
    const disabledStyle = css`
      background-color: ${vars.colorAccent98};
      border-color: ${vars.colorNeutral};
      color: ${vars.colorNeutral60};
      box-shadow: none;
    `;
    switch (theme) {
      case 'info':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${vars.colorInfo85};
              background-color: ${vars.colorInfo85};
            }
          `,
        ];
      case 'primary':
        return [
          disabledStyle,
          css`
            &:hover {
              border-color: ${vars.colorPrimary85};
              background-color: ${vars.colorPrimary85};
            }
          `,
        ];
      default:
        return disabledStyle;
    }
  }
  if (isActive) {
    const activeStyle = css`
      box-shadow: ${vars.shadow9};
      background-color: ${vars.colorSurface};
      border-color: ${vars.colorSurface};
      &:hover {
        box-shadow: ${vars.shadow9};
        background-color: ${vars.colorNeutral95};
        border-color: ${vars.colorNeutral95};
      }
    `;
    switch (theme) {
      case 'info':
        return [
          activeStyle,
          isDisabled &&
            // When the button is active and somehow is disabled it should have
            // a different color to indicate that it's active but can't receive any actions
            css`
              background-color: ${vars.colorInfo85};
              border-color: ${vars.colorInfo85};
              color: ${vars.colorSurface};
              box-shadow: ${vars.shadow9};
            `,
          css`
            background-color: ${vars.colorInfo};
            border-color: ${vars.colorInfo};
            color: ${vars.colorSurface};
            &:hover {
              background-color: ${vars.colorInfo85};
              border-color: ${vars.colorInfo85};
            }
          `,
        ];
      case 'primary':
        return [
          activeStyle,
          // When the button is active and somehow is disabled it should have
          // a different color to indicate that it's active but can't receive any actions
          isDisabled &&
            css`
              background-color: ${vars.colorPrimary85};
              border-color: ${vars.colorPrimary85};
              color: ${vars.colorSurface};
              box-shadow: ${vars.shadow9};
            `,

          css`
            background-color: ${vars.colorPrimary};
            color: ${vars.colorSurface};
            &:hover {
              background-color: ${vars.colorPrimary85};
              border-color: ${vars.colorPrimary85};
            }
          `,
        ];
      default:
        return activeStyle;
    }
  }
  return css`
    &:hover {
      box-shadow: ${vars.shadow8};
    }
    &:active {
      box-shadow: ${vars.shadow9};
      background-color: ${vars.colorSurface};
      border-color: ${vars.colorSurface};
    }
  `;
};

const getShapeStyles = (shape, size) => {
  switch (shape) {
    case 'round':
      return css`
        border-radius: 50%;
      `;
    case 'square':
      switch (size) {
        case 'small':
          return css`
            border-radius: ${vars.borderRadius2};
          `;
        case 'medium':
          return css`
            border-radius: ${vars.borderRadius4};
          `;
        case 'big':
          return css`
            border-radius: ${vars.borderRadius6};
          `;
        default:
          return css``;
      }
    default:
      return css``;
  }
};
const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return css`
        height: ${buttonSizes.small};
        width: ${buttonSizes.small};
      `;
    case 'medium':
      return css`
        height: ${buttonSizes.medium};
        width: ${buttonSizes.medium};
      `;
    case 'big':
      return css`
        height: ${buttonSizes.big};
        width: ${buttonSizes.big};
      `;
    default:
      return css``;
  }
};
const getThemeStyles = (theme) => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'primary':
      return css`
        &:hover {
          background-color: ${vars.colorPrimary};
          border-color: ${vars.colorPrimary};
          color: ${vars.colorSurface};
        }
      `;
    case 'info':
      return css`
        &:hover {
          background-color: ${vars.colorInfo};
          border-color: ${vars.colorInfo};
          color: ${vars.colorSurface};
        }
      `;
    default: {
      invariant(
        false,
        `ui-kit/IconButton: the specified theme '${theme}' is not supported.`
      );
      return css``;
    }
  }
};

const getHoverStyles = (isDisabled, theme) => {
  if (theme === 'default' || isDisabled) return css``;

  return css`
    &:hover {
      * {
        fill: ${vars.colorSurface};
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
};
