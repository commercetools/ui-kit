import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';

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
        <Icons.Close theme={props.isDisabled && 'grey'} size="medium" />
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
