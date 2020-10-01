import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getTextareaStyles = (props) => {
  const baseStyles = [
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `,
    props.isCollapsed &&
      css`
        overflow: hidden;
      `,
  ];
  return baseStyles;
};

const getLanguageLabelStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return css`
    /* avoid wrapping label onto new lines */
    flex: 1 0 auto;
    color: ${overwrittenVars[designTokens.fontColorForInputWhenDisabled]};
    line-height: calc(${vars.sizeHeightInput} - 2 * ${vars.borderRadius1});
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

const getToggleButtonWrapperPosition = (props) =>
  !props.shouldToggleButtonTakeSpace
    ? css`
        position: absolute;
        top: 0;
        right: 0;
        margin-top: ${vars.spacingXs};
      `
    : '';

const ToggleButtonWrapper = styled.div`
  flex: 0;
  display: flex;
  ${getToggleButtonWrapperPosition}
`;

export { getTextareaStyles, getLanguageLabelStyles, ToggleButtonWrapper };
