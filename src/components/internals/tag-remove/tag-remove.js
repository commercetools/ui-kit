import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';

const TagRemove = props => (
  <div {...props.innerProps}>
    <Icons.CloseBold size="medium" />
  </div>
);

TagRemove.displayName = 'TagRemove';

TagRemove.propTypes = {
  innerProps: PropTypes.object,
};

export default TagRemove;
