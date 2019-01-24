import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

/* we need this line-height to achieve 32px height when the component has only one row */
const sizeInputLineHeight = '22px';

// NOTE: order is important here
// * a disabled-field currently does not display warning/error-states so it takes precedence
// * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
// how you can interact with the field is controlled separately by the props, this only influences visuals
const getTextareaStyles = props => {
  const baseInputStyles = [
    css`
      box-sizing: border-box;
      color: ${vars.fontColorDefault};
      font-family: ${vars.fontFamilyDefault};
      font-size: ${vars.fontSizeDefault};
      min-height: ${vars.sizeHeightInput};
      border-top-right-radius: ${vars.borderRadiusInput};
      border-bottom-right-radius: ${vars.borderRadiusInput};
      width: 100%;
      border-style: solid;
      border-width: ${vars.borderRadius1};
      padding: ${vars.spacing4} ${vars.spacing8};
      transition: ${vars.transitionStandard};
      outline: 0;
      box-shadow: none;
      appearance: none;
      line-height: ${sizeInputLineHeight};
      white-space: pre-wrap;
      resize: vertical;

      &::placeholder {
        color: ${vars.fontColorPlaceholder};
      }
    `,
    props.isCollapsed &&
      css`
        overflow: hidden;
        word-break: break-all;
      `,
  ];
  if (props.isDisabled) {
    return [
      baseInputStyles,
      css`
        cursor: not-allowed;
        color: ${vars.fontColorDisabled};
        border-color: ${vars.borderColorInputDisabled};
        background-color: ${vars.backgroundColorInputDisabled};
        opacity: 1; /* fix for mobile safari */
      `,
    ];
  }
  if (props.hasError) {
    return [
      baseInputStyles,
      css`
        color: ${vars.fontColorError};
        border-color: ${vars.borderColorInputError};
      `,
    ];
  }
  if (props.hasWarning) {
    return [
      baseInputStyles,
      css`
        color: ${vars.fontColorWarning};
        border-color: ${vars.borderColorInputWarning};
      `,
    ];
  }
  if (props.isReadOnly) {
    return [
      baseInputStyles,
      css`
        border-color: ${vars.borderColorInputReadonly};
        color: ${vars.fontColorReadonly};
        cursor: default;
      `,
    ];
  }
  return [
    baseInputStyles,
    css`
      &:active,
      &:focus {
        border-color: ${vars.borderColorInputFocus};
        background: ${vars.backgroundColorInputPristine};
        color: ${vars.fontColorDefault};
      }
    `,
  ];
};

const getLanguageLabelStyles = () => css`
  /* avoid wrapping label onto new lines */
  flex: 1 0 auto;
  color: ${vars.fontColorDisabled};
  line-height: calc(${vars.sizeHeightInput} - 2 * ${vars.borderRadius1});
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

export { getTextareaStyles, getLanguageLabelStyles };
