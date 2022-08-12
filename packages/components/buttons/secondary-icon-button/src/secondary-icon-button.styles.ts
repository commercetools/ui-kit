import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TSecondaryButtonProps } from './secondary-icon-button';

const getDisabledStyle = () => {
  /* By using the css 'disabled' selector directly, we don't need additional logic to check the isDisabled prop */
  return css`
    &:disabled svg {
      fill: ${customProperties.colorNeutral60};
    }
  `;
};

const getColorStyle = (props: Pick<TSecondaryButtonProps, 'color'>) => {
  switch (props.color) {
    case 'solid':
      return css`
        & svg {
          fill: ${customProperties.colorSolid};
        }
        &:focus,
        &:hover svg {
          fill: ${customProperties.colorPrimary};
        }
      `;
    case 'primary':
      return css`
        & svg {
          fill: ${customProperties.colorPrimary};
        }
        &:focus,
        &:hover svg {
          fill: ${customProperties.colorPrimary25};
        }
      `;
    default:
      return css`
        svg {
          fill: ${customProperties.colorSolid};
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
