import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const Wrapper = props => (
  <div
    css={css`
      display: inline-block;
    `}
    {...props}
  >
    {props.children}
  </div>
);

Wrapper.displayName = 'Wrapper';

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
