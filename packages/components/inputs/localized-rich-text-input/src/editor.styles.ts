import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TEditorProps } from './editor';

const getEditorLanguageLabelBorderColor = (props: TEditorLanguageLabelProps) =>
  `1px solid ${
    props.isReadOnly
      ? designTokens.borderColorForInputWhenReadonly
      : designTokens.borderColorForInputWhenDisabled
  }`;

  type TInputProps = {
    isDisabled?: boolean;
    isReadOnly?: boolean;
  };

type TEditorLanguageLabelProps = {
  isReadOnly?: boolean;
  isDisabled?: boolean;
};

const getBackgroundColor = (props: TInputProps) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForInputWhenDisabled;
  }
  return designTokens.backgroundColorForInput;
};


const EditorLanguageLabel = styled.label<TEditorLanguageLabelProps>`
  /* avoid wrapping label onto new lines */
  white-space: nowrap;
  flex: 0;
  color: ${designTokens.fontColorForInputWhenDisabled};
  line-height: calc(
    ${designTokens.sizeHeightInput} - 2 * ${designTokens.borderRadius1}
  );
  background-color: ${(props) => getBackgroundColor(props)};
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
