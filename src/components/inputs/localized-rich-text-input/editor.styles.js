/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/core';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

const getLanguageLabelStyles = (props, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  return css`
    /* avoid wrapping label onto new lines */
    white-space: nowrap;
    flex: 0;
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

export { getLanguageLabelStyles };
