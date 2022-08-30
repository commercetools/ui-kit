import styled from '@emotion/styled';
import {
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';
import type { TEditorProps } from './editor';

const EditorLanguageLabel = styled.label`
  /* avoid wrapping label onto new lines */
  white-space: nowrap;
  flex: 0;
  color: ${customProperties[designTokens.fontColorForInputWhenDisabled]};
  line-height: calc(
    ${customProperties.sizeHeightInput} - 2 * ${customProperties.borderRadius1}
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
  border: 1px ${customProperties[designTokens.borderColorForInputWhenDisabled]}
    solid;
  padding: 0 ${customProperties.spacingS};
  transition: border-color ${customProperties.transitionStandard},
    background-color ${customProperties.transitionStandard},
    color ${customProperties.transitionStandard};
  border-right: 0;
  box-shadow: none;
  appearance: none;

  /* cursor should be inherited from parent,
    * GIVEN parent has 'not-allowed' cursor
    * THEN the language label should also have that (instead of label's default cursor)
    */
  cursor: inherit;
`;

const EditorWrapper = styled.div<
  Pick<TEditorProps, 'isDisabled' | 'isReadOnly'>
>`
  width: 100%;
  position: relative;
  display: flex;
  cursor: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'not-allowed' : 'inherit'};
`;

const ToggleButtonWrapper = styled.div`
  flex: 0;
  display: flex;
`;

export { EditorLanguageLabel, EditorWrapper, ToggleButtonWrapper };
