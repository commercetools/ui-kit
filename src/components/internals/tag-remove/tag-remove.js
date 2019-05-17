import React from 'react';
import PropTypes from 'prop-types';
import { CloseBoldIcon } from '../../icons';

const TagRemove = props => (
  <div {...props.innerProps}>
    <CloseBoldIcon
      theme={props.selectProps.isDisabled ? 'grey' : 'black'}
      size="medium"
    />
  </div>
);

TagRemove.displayName = 'TagRemove';

TagRemove.propTypes = {
  selectProps: PropTypes.shape({
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
  innerProps: PropTypes.object,
};

export default TagRemove;
