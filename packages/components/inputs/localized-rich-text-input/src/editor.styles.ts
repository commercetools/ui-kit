import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TEditorProps } from './editor';

const getEditorLanguageLabelBorderColor = (props: TEditorLanguageLabelProps) =>
  `1px solid ${
    props.isReadOnly
      ? designTokens.borderColorForInputWhenReadonly
      : designTokens.borderColorForInputWhenDisabled
  }`;

type TEditorLanguageLabelProps = {
  isReadOnly?: boolean;
};
const EditorLanguageLabel = styled.label<TEditorLanguageLabelProps>`
  /* avoid wrapping label onto new lines */
  white-space: nowrap;
  flex: 0;
  color: ${designTokens.fontColorForInputWhenDisabled};
  line-height: calc(
    ${designTokens.sizeHeightInput} - 2 * ${designTokens.borderRadius1}
  );
  background-color: ${designTokens.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${designTokens.borderRadiusForInput};
  border-bottom-left-radius: ${designTokens.borderRadiusForInput};
  border: ${(props) => getEditorLanguageLabelBorderColor(props)};
  padding: ${designTokens.paddingForLocalizedRichTextInputLabel};
  transition: border-color ${designTokens.transitionStandard},
    background-color ${designTokens.transitionStandard},
    color ${designTokens.transitionStandard};
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
