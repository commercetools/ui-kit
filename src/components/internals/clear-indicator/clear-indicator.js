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
      <CloseIcon theme={props.isDisabled && 'grey'} size="medium" />
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
