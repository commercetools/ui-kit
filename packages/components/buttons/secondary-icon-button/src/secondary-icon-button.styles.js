import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getDisabledStyle = (overwrittenVars) => {
  /* By using the css 'disabled' selector directly, we don't need additional logic to check the isDisabled prop */
  return css`
    &:disabled svg * {
      fill: ${overwrittenVars.colorNeutral60};
    }
  `;
};

const getColorStyle = (props, overwrittenVars) => {
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

const getBaseStyles = (theme, props) => {
  const overwrittenVars = {
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
