import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    box-sizing: border-box;
    color: ${designTokens.fontColorForInputWhenDisabled};
    height: ${designTokens.heightForInput};
    background-color: ${designTokens.backgroundColorForInputWhenDisabled};
    border-top-left-radius: ${designTokens.borderRadiusForInput};
    border-bottom-left-radius: ${designTokens.borderRadiusForInput};
    border: 1px ${designTokens.borderColorForInputWhenDisabled} solid;
    padding: 0 ${designTokens.spacing20};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getLocalizedInputStyles, getLanguageLabelStyles };
