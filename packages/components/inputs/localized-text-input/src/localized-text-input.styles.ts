import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { TLocalizedInputProps } from './localized-text-input';

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

const getLanguageLabelStyles = (props: TLocalizedInputProps) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    box-sizing: border-box;
    color: ${designTokens.fontColorForLocalizedInputLabel};
    cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
    height: ${designTokens.heightForInput};
    font-size: ${designTokens.fontSizeForLocalizedInputLabel};
    background-color: ${getLanguageLabelBackgroundColor(props)};
    border-top-left-radius: ${designTokens.borderRadiusForInput};
    border-bottom-left-radius: ${designTokens.borderRadiusForInput};
    border: 1px solid
      ${props.isReadOnly
        ? designTokens.colorSurface
        : designTokens.borderColorForInputWhenDisabled};
    padding: ${designTokens.paddingForLocalizedInputLabel};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getLocalizedInputStyles, getLanguageLabelStyles };
