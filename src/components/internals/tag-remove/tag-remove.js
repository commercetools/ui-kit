import React from 'react';
import PropTypes from 'prop-types';
import { CloseBoldIcon } from '../../icons';

const TagRemove = props => (
  <div {...props.innerProps}>
    <CloseBoldIcon size="medium" />
  </div>
);

TagRemove.displayName = 'TagRemove';

TagRemove.propTypes = {
  innerProps: PropTypes.object,
};

export default TagRemove;
