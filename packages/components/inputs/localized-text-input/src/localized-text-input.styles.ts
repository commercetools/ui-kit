import { css, type Theme } from '@emotion/react';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getLocalizedInputStyles = () => [
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-style: solid;
    flex: auto;
  `,
];

const getLanguageLabelStyles = (_props: unknown, theme: Theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return css`
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    box-sizing: border-box;
    color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
    height: ${vars.sizeHeightInput};
    line-height: ${vars.sizeHeightInput};
    background-color: ${overwrittenVars[
      designTokens.backgroundColorForInputWhenDisabled
    ]};
    border-top-left-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
    border-bottom-left-radius: ${overwrittenVars[
      designTokens.borderRadiusForInput
    ]};
    border: 1px ${overwrittenVars[designTokens.borderColorForInputWhenDisabled]}
      solid;
    padding: 0 ${vars.spacingS};
    transition: border-color ${vars.transitionStandard},
      background-color ${vars.transitionStandard},
      color ${vars.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getLocalizedInputStyles, getLanguageLabelStyles };
