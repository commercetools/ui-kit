import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals

type TTranslationInputStylesProps = {
  isCollapsed?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

const getTextareaStyles = (props: TTranslationInputStylesProps) => {
  const baseStyles = [
    css`
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    `,
    props.isCollapsed &&
      css`
        overflow: hidden;
      `,
  ];
  return baseStyles;
};

const getLanguageLabelBackgroundColor = (props: TTranslationInputStylesProps) =>
  props.isDisabled
    ? designTokens.backgroundColorForLocalizedMultilineTextInputLabelWhenDisabled
    : designTokens.backgroundColorForLocalizedMultilineTextInputLabel;

const getLanguageLabelBorderColor = (props: TTranslationInputStylesProps) =>
  props.isReadOnly
    ? designTokens.borderColorForLocalizedMultilineTextInputLabelWhenReadonly
    : designTokens.borderColorForLocalizedMultilineTextInputLabel;

const getLanguageLabelStyles = (props: TTranslationInputStylesProps) => {
  return css`
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    color: ${designTokens.fontColorForLocalizedMultilineTextInputLabel};
    line-height: calc(
      ${designTokens.heightForInput} - 2 * ${designTokens.borderRadius1}
    );
    background-color: ${getLanguageLabelBackgroundColor(props)};
    border-top-left-radius: ${designTokens.borderRadiusForInput};
    border-bottom-left-radius: ${designTokens.borderRadiusForInput};
    border: 1px ${getLanguageLabelBorderColor(props)} solid;
    padding: ${designTokens.paddingForLocalizedMultilineTextInputLabel};
    font-size: ${designTokens.fontSizeForLocalizedMultilineTextInputLabel};
    transition: border-color ${designTokens.transitionStandard},
      background-color ${designTokens.transitionStandard},
      color ${designTokens.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

const ToggleButtonWrapper = styled.div`
  flex: 0;
  display: flex;
`;

export { getTextareaStyles, getLanguageLabelStyles, ToggleButtonWrapper };
