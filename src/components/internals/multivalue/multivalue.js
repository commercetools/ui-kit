import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import Tag from '../../tag';

const MultiValue = props => (
  <div
    css={css`
      display: inline-block;
      margin: 2px;
    `}
  >
    <Tag
      // in order to make our Tag match the previous tags, we need to set these
      // custom styles
      styles={{
        body: css`
          padding: 4px 8px 3px 6px;
        `,
      }}
      isDisabled={props.isDisabled}
      onRemove={props.removeProps.onClick}
    >
      {props.data.label}
    </Tag>
  </div>
);

MultiValue.displayName = 'MultiValue';

MultiValue.propTypes = {
  isDisabled: PropTypes.bool,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default MultiValue;
