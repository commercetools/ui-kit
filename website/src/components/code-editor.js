import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, withLive } from 'react-live';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import Downshift from 'downshift';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import * as intl from 'react-intl';
import * as uikit from 'ui-kit';

const { customProperties, Grid } = uikit;

const StyledProvider = styled(LiveProvider)`
  border-radius: 4px;
  border: 1px solid ${customProperties.borderColorForInputWhenReadonly};
  overflow: hidden;
`;
const PreviewPanel = styled.div`
  overflow: hidden;
  height: auto;
  background: ${customProperties.colorWhite};
  padding: ${customProperties.spacing16};
  min-height: 120px;
  max-height: 320px;
`;
const ErrorPanel = styled(PreviewPanel)`
  background: ${customProperties.colorRed95};
  color: ${customProperties.colorRed};
  white-space: pre-wrap;
`;
const EditorPanel = styled(LiveEditor)`
  overflow: scroll;
  height: auto;
  background: ${customProperties.colorNavy95};
  padding: ${customProperties.spacing16};
  box-shadow: ${customProperties.shadow9Second};
  font-size: 1.2rem;
  min-height: 120px;
  max-height: 320px;
`;

// TODO: use `LiveContext` once it's released in the next `react-live` version
const WithLive = withLive(props => props.children(props.live));

const CodeEditor = props => (
  <StyledProvider
    noInline={props.noInline}
    mountStylesheet={false}
    scope={{
      css,
      ...uikit,
      ...intl,
      Formik,
      Downshift,
      moment,
      momentTimezone,
      ...props.scope,
    }}
    code={props.code}
  >
    <Grid
      gridGap="0"
      gridAutoColumns="1fr"
      gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))"
    >
      <WithLive>
        {live => {
          if (live.error) {
            return (
              <ErrorPanel
                className="react-live-error"
                style={props.customStyles}
              >
                {live.error}
              </ErrorPanel>
            );
          }
          const Element = live.element;
          return (
            <PreviewPanel
              className="react-live-preview"
              style={props.customStyles}
            >
              {Element && <Element />}
            </PreviewPanel>
          );
        }}
      </WithLive>
      <EditorPanel ignoreTabKey={true} style={props.customStyles} />
    </Grid>
  </StyledProvider>
);
CodeEditor.displayName = 'CodeEditor';
CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object,
  noInline: PropTypes.bool,
  customStyles: PropTypes.object,
};
CodeEditor.defaultProps = {
  scope: {},
  noInline: false,
  customStyles: {},
};
export default CodeEditor;
