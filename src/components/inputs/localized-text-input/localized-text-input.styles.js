import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import { getInputStyles } from '../styles';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getLocalizedInputStyles = props => [
  getInputStyles(props),
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-style: solid;
    flex: auto;
  `,
];

const getLanguageLabelStyles = () => css`
  /* avoid wrapping label onto new lines */
  flex: 1 0 auto;
  box-sizing: border-box;
  color: ${vars.fontColorDisabled};
  height: ${vars.sizeHeightInput};
  line-height: ${vars.sizeHeightInput};
  background-color: ${vars.backgroundColorInputDisabled};
  border-top-left-radius: ${vars.borderRadiusInput};
  border-bottom-left-radius: ${vars.borderRadiusInput};
  border: 1px ${vars.borderColorInputDisabled} solid;
  padding: 0 ${vars.spacing8};
  transition: ${vars.transitionStandard};
  border-right: 0;
  box-shadow: none;
  appearance: none;
`;

export { getLocalizedInputStyles, getLanguageLabelStyles };
