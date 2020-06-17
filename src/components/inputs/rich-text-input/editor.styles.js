/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';

const EditorWrapper = styled.div`
  cursor: ${(props) =>
    props.isDisabled || props.isReadOnly ? 'not-allowed' : 'inherit'};
`;

export { EditorWrapper };
