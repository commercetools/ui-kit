import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const Section = (props) => {
  return (
    <div
      css={(theme) => css`
        background-color: ${theme.colorSurface};
        padding: 16px;
      `}
    >
      {props.children}
    </div>
  );
};

Section.propTypes = { children: PropTypes.node.isRequired };

export default Section;
