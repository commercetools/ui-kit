import React from 'react';
import PropTypes from 'prop-types';
import accessibleHiddenInputStyles from '../accessible-hidden-input.styles';

const HiddenInput = (props) => {
  const { handleFocus } = props;
  const onFocus = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!props.isFocused) {
        handleFocus();
      }
    },
    [props.isFocused, handleFocus]
  );

  const onBlur = React.useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <input
      css={accessibleHiddenInputStyles}
      id={props.id}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1}
    />
  );
};

HiddenInput.displayName = 'HiddenInput';

HiddenInput.propTypes = {
  handleFocus: PropTypes.func,
  id: PropTypes.string,
  isFocused: PropTypes.bool.isRequired,
};

export default HiddenInput;
