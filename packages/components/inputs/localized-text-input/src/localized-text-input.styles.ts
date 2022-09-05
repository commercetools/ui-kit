import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

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

const getLanguageLabelStyles = (_props: unknown) => {
  return css`
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    box-sizing: border-box;
    color: ${customProperties.fontColorForInputWhenDisabled};
    height: ${customProperties.sizeHeightInput};
    line-height: ${customProperties.sizeHeightInput};
    background-color: ${customProperties.backgroundColorForInputWhenDisabled};
    border-top-left-radius: ${customProperties.borderRadiusForInput};
    border-bottom-left-radius: ${customProperties.borderRadiusForInput};
    border: 1px ${customProperties.borderColorForInputWhenDisabled} solid;
    padding: 0 ${customProperties.spacingS};
    transition: border-color ${customProperties.transitionStandard},
      background-color ${customProperties.transitionStandard},
      color ${customProperties.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getLocalizedInputStyles, getLanguageLabelStyles };
