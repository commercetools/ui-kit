import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import * as uikit from 'ui-kit';

const { customProperties } = uikit;

const StyledProvider = styled(LiveProvider)`
  border-radius: 4px;
  overflow: hidden;
`;
const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;

  @media (max-width: 799px) {
    flex-direction: column;
  }
`;
const PreviewPanel = styled(LivePreview)`
  overflow: hidden;
  height: auto;
  background: ${customProperties.colorWhite};
  border: 1px solid ${customProperties.borderColorInputDisabled};
  border-radius: 8px 0 0 8px;
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 799px) {
    border-radius: 8px 8px 0 0;
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;
const EditorPanel = styled(LiveEditor)`
  overflow: scroll;
  height: 320px;
  background: ${customProperties.colorBlack};
  border-radius: 0 8px 8px 0;
  font-size: 1.2rem;
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 799px) {
    border-radius: 0 0 8px 8px;
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const CodeEditor = props => (
  <StyledProvider
    {...props}
    mountStylesheet={false}
    scope={{ css, ...uikit }}
    code={props.code}
  >
    <EditorContainer>
      <PreviewPanel />
      <EditorPanel ignoreTabKey={true} />
    </EditorContainer>
    <LiveError />
  </StyledProvider>
);
CodeEditor.displayName = 'CodeEditor';
CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
};
CodeEditor.defaultProps = {
  transformCode: function transformCode(src) {
    if (src.startsWith('<')) return src;
    return `<React.Fragment>${src}</React.Fragment>`;
  },
};

export default CodeEditor;
