import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals

type TTranslationInputStylesProps = {
  isCollapsed?: boolean;
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

const getLanguageLabelStyles = (_props: TTranslationInputStylesProps) => {
  return css`
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    color: ${customProperties[designTokens.fontColorForInputWhenDisabled]};
    line-height: calc(
      ${customProperties.sizeHeightInput} - 2 *
        ${customProperties.borderRadius1}
    );
    background-color: ${customProperties[
      designTokens.backgroundColorForInputWhenDisabled
    ]};
    border-top-left-radius: ${customProperties[
      designTokens.borderRadiusForInput
    ]};
    border-bottom-left-radius: ${customProperties[
      designTokens.borderRadiusForInput
    ]};
    border: 1px
      ${customProperties[designTokens.borderColorForInputWhenDisabled]} solid;
    padding: 0 ${customProperties.spacingS};
    transition: border-color ${customProperties.transitionStandard},
      background-color ${customProperties.transitionStandard},
      color ${customProperties.transitionStandard};
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
