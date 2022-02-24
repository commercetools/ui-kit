/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import type { TEditorProps } from './editor';

type TEditorWrapperProps = Pick<TEditorProps, 'isDisabled'>;

const EditorWrapper = styled.div<TEditorWrapperProps>`
  align-self: stretch;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'inherit')};
`;

export { EditorWrapper };
