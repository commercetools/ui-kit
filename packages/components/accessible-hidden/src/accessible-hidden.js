import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const AccessibleHidden = props => {
  return (
    <div
      css={css`
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        padding: 0;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
      `}
    >
      {props.children}
    </div>
  );
};
AccessibleHidden.displayName = 'AccessibleHidden';
AccessibleHidden.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccessibleHidden;
