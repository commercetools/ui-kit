import styled from '@emotion/styled';
import type { TEditorProps } from './editor';

type TEditorWrapperProps = Pick<TEditorProps, 'isDisabled' | 'isReadOnly'>;

const EditorWrapper = styled.div<TEditorWrapperProps>`
  align-self: stretch;
  cursor: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'not-allowed' : 'inherit'};
`;

export { EditorWrapper };
