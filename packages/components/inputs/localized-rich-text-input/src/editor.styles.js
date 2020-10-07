/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties as vars,
  designTokens,
} from '@commercetools-uikit/design-system';

const EditorLanguageLabel = styled.label((props) => {
  const overwrittenVars = {
    ...vars,
    ...props.theme,
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

    /* cursor should be inherited from parent,
    * GIVEN parent has 'not-allowed' cursor
    * THEN the language label should also have that (instead of label's default cursor)
    */
    cursor: inherit;
  `;
});

const EditorWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  cursor: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'not-allowed' : 'inherit'};
`;

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

export { EditorLanguageLabel, EditorWrapper, ToggleButtonWrapper };
