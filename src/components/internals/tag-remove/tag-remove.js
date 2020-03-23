import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { CloseBoldIcon } from '@commercetools-uikit/icons';

// see https://github.com/JedWatson/react-select/blob/44e9fb29b230e49a754a2f0d6f30c2250aa45009/src/components/MultiValue.js
const removeProps = ['onClick', 'onTouchEnd', 'onMouseDown'];

const TagRemove = (props) => {
  // when the select input is disabled,
  // we don't want to spread the removeProp event handlers
  const innerProps = props.selectProps.isDisabled
    ? omit(props.innerProps, removeProps)
    : props.innerProps;

  return (
    <div {...innerProps}>
      <CloseBoldIcon
        color={props.selectProps.isDisabled ? 'neutral60' : 'solid'}
        size="medium"
      />
    </div>
  );
};

TagRemove.displayName = 'TagRemove';

TagRemove.propTypes = {
  selectProps: PropTypes.shape({
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
  innerProps: PropTypes.object,
};

export default TagRemove;
