import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TLocalizedInputProps } from './localized-text-input';

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

const getLanguageLabelBackgroundColor = (props: TLocalizedInputProps) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForLocalizedInputLabelWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForLocalizedInputLabelWhenReadonly;
  }
  return designTokens.backgroundColorForLocalizedInputLabel;
};

const getLanguageLabelBorderColor = (props: TLocalizedInputProps) => {
  if (props.isDisabled) {
    return designTokens.borderColorForInputWhenDisabled;
  }
  return props.isReadOnly
    ? designTokens.colorSurface
    : designTokens.colorNeutral;
};

const getLanguageLabelStyles = (props: TLocalizedInputProps) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    box-sizing: border-box;
    color: ${designTokens.colorNeutral60};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: ${props.isCondensed
      ? designTokens.heightForInputAsSmall
      : designTokens.heightForInput};
    font-size: ${props.isCondensed
      ? designTokens.fontSize20
      : designTokens.fontSize30};
    background-color: ${getLanguageLabelBackgroundColor(props)};
    border-top-left-radius: ${designTokens.borderRadiusForInput};
    border-bottom-left-radius: ${designTokens.borderRadiusForInput};
    border: 1px solid ${getLanguageLabelBorderColor(props)};
    padding: 0 ${designTokens.spacing25};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getLocalizedInputStyles, getLanguageLabelStyles };
