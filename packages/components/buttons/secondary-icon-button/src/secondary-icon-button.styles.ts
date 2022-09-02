import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TSecondaryButtonProps } from './secondary-icon-button';

const getDisabledStyle = () => {
  /* By using the css 'disabled' selector directly, we don't need additional logic to check the isDisabled prop */
  return css`
    &:disabled svg {
      fill: ${designTokens.colorNeutral60};
    }
  `;
};

const getColorStyle = (props: Pick<TSecondaryButtonProps, 'color'>) => {
  switch (props.color) {
    case 'solid':
      return css`
        & svg {
          fill: ${designTokens.colorSolid};
        }
        &:focus,
        &:hover svg {
          fill: ${designTokens.colorPrimary};
        }
      `;
    case 'primary':
      return css`
        & svg {
          fill: ${designTokens.colorPrimary};
        }
        &:focus,
        &:hover svg {
          fill: ${designTokens.colorPrimary25};
        }
      `;
    default:
      return css`
        svg {
          fill: ${designTokens.colorSolid};
        }
      `;
  }
};

const getBaseStyles = (props: TSecondaryButtonProps) => {
  return [
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `,
    getColorStyle(props),
    getDisabledStyle(),
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getBaseStyles };
