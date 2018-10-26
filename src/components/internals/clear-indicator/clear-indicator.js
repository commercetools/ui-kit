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
      <div>
        <CloseIcon theme={props.isDisabled && 'grey'} size="medium" />
      </div>
    </div>
  );
};

ClearIndicator.displayName = 'ClearIndicator';

ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export default ClearIndicator;
