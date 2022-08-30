import type { Theme } from '@emotion/react';

import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

const getStateStyles = (
  isDisabled: boolean,
  isActive: boolean,
  theme: Theme
) => {
  if (isDisabled) {
    const baseDisabledStyles = css`
      box-shadow: 0 0 0 1px ${customProperties.colorNeutral} inset;
      background-color: ${customProperties.colorAccent98};
      color: ${customProperties.colorNeutral60};
    `;
    switch (theme) {
      case 'info':
        return [
          baseDisabledStyles,
          css`
            color: ${customProperties.colorNeutral60};
          `,
          isActive && `color: ${customProperties.colorInfo};`,
        ];
      default:
        return baseDisabledStyles;
    }
  }
  if (isActive) {
    const baseActiveStyles = [
      css`
        box-shadow: ${customProperties.shadow9};
        background-color: ${customProperties.colorSurface};
        &:focus,
        &:hover {
          background-color: ${customProperties.colorNeutral95};
        }
      `,
      isDisabled &&
        css`
          box-shadow: 0 0 0 1px ${customProperties.colorNeutral} inset;
          background-color: ${customProperties.colorAccent98};
          color: ${customProperties.colorNeutral60};
        `,
    ];
    switch (theme) {
      case 'info':
        return [
          baseActiveStyles,
          css`
            color: ${customProperties.colorInfo};
          `,
        ];
      default:
        return baseActiveStyles;
    }
  }
  return css`
    &:focus,
    &:hover {
      box-shadow: ${customProperties.shadow8};
    }
    &:active {
      box-shadow: ${customProperties.shadow9};
      background-color: ${customProperties.colorSurface};
    }
  `;
};

const getThemeStyles = (theme: Theme) => {
  if (!theme) return css``;

  if (theme === 'default') return css``;

  switch (theme) {
    case 'info':
      return css`
        &:focus,
        &:hover {
          color: ${customProperties.colorInfo};

          * {
            fill: ${customProperties.colorInfo};
          }
        }
      `;
    default: {
      warning(
        false,
        `ui-kit/SecondaryButton: the specified theme '${theme}' is not supported.`
      );
      return css`
        &:focus,
        &:hover {
          box-shadow: ${customProperties.shadow8};
        }
        &:active {
          box-shadow: ${customProperties.shadow9};
          background-color: ${customProperties.colorSurface};
        }
      `;
    }
  }
};

export { getStateStyles, getThemeStyles };
