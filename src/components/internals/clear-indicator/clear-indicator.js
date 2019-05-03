import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../icons';

const ClearIndicator = props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <CloseIcon color={props.isDisabled && 'neutral60'} size="medium" />
    </div>
  );
};

ClearIndicator.displayName = 'ClearIndicator';

ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  isDisabled: PropTypes.bool,
  getStyles: PropTypes.func.isRequired,
};

export default ClearIndicator;
