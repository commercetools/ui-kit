import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import type { TSecondaryButtonProps } from './secondary-icon-button';

type TExtendedTheme = {
  [key: string]: string;
} & Theme;

const getDisabledStyle = (overwrittenVars: TExtendedTheme) => {
  /* By using the css 'disabled' selector directly, we don't need additional logic to check the isDisabled prop */
  return css`
    &:disabled svg * {
      fill: ${overwrittenVars.colorNeutral60};
    }
  `;
};

const getColorStyle = (
  props: Pick<TSecondaryButtonProps, 'color'>,
  overwrittenVars: TExtendedTheme
) => {
  switch (props.color) {
    case 'solid':
      return css`
        & svg * {
          fill: ${overwrittenVars.colorSolid};
        }
        &:focus,
        &:hover svg * {
          fill: ${overwrittenVars.colorPrimary};
        }
      `;
    case 'primary':
      return css`
        & svg * {
          fill: ${overwrittenVars.colorPrimary};
        }
        &:focus,
        &:hover svg * {
          fill: ${overwrittenVars.colorPrimary25};
        }
      `;
    default:
      return css`
        svg * {
          fill: ${overwrittenVars.colorSolid};
        }
      `;
  }
};

const getBaseStyles = (props: TSecondaryButtonProps, theme: Theme) => {
  const overwrittenVars: TExtendedTheme = {
    ...vars,
    ...theme,
  };

  return [
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `,
    getColorStyle(props, overwrittenVars),
    getDisabledStyle(overwrittenVars),
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getBaseStyles };
