import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Formik } from 'formik';
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
  height: auto;
  max-height: 320px;

  @media (max-width: 799px) {
    flex-direction: column;
    max-height: auto;
  }
`;
const PreviewPanel = styled(LivePreview)`
  overflow: hidden;
  height: auto;
  background: ${customProperties.colorWhite};
  border: 1px solid ${customProperties.borderColorInputDisabled};
  border-radius: ${customProperties.spacing8} 0 0 ${customProperties.spacing8};
  padding: ${customProperties.spacing16};
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 799px) {
    border-radius: ${customProperties.spacing8} ${customProperties.spacing8} 0 0;
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
    min-height: 240px;
    overflow: scroll;
  }
`;
const EditorPanel = styled(LiveEditor)`
  overflow: scroll;
  height: auto;
  background: ${customProperties.colorBlack};
  border-radius: 0 ${customProperties.spacing8} ${customProperties.spacing8} 0;
  padding: ${customProperties.spacing16};
  font-size: 1.2rem;
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 799px) {
    border-radius: 0 0 ${customProperties.spacing8} ${customProperties.spacing8};
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
    max-height: 240px;
  }
`;

const CodeEditor = props => (
  <StyledProvider
    {...props}
    mountStylesheet={false}
    scope={{ css, ...uikit, Formik, ...props.scope }}
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
  scope: PropTypes.object,
};
CodeEditor.defaultProps = {
  scope: {},
  transformCode: function transformCode(src) {
    if (src.startsWith('<')) return src;
    return `<React.Fragment>${src}</React.Fragment>`;
  },
};

export default CodeEditor;
