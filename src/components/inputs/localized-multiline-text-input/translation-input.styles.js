import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import designTokens from '../../../../materials/design-tokens';
import { getInputStyles } from '../styles';

/* we need this line-height to achieve 32px height when the component has only one row */
const sizeInputLineHeight = '22px';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getTextareaStyles = (props, theme) => {
  const baseStyles = [
    getInputStyles(props, theme),
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      flex: auto;
      line-height: ${sizeInputLineHeight};
      padding: ${vars.spacing4} ${vars.spacing8};
      word-break: break-all;
      white-space: pre-wrap;
      resize: vertical;
    `,
    props.isCollapsed &&
      css`
        overflow: hidden;
        word-break: break-all;
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
    padding: 0 ${vars.spacing8};
    transition: ${vars.transitionStandard};
    border-right: 0;
    box-shadow: none;
    appearance: none;
  `;
};

export { getTextareaStyles, getLanguageLabelStyles };
