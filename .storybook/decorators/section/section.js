import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider } from '../../../src';

const sectionStyles = {
  padding: 16,
};

const Section = props => (
  <StylesProvider baseFontSize="13px">
    <div style={sectionStyles}>{props.children}</div>
  </StylesProvider>
);

Section.propTypes = { children: PropTypes.node.isRequired };

export default Section;
