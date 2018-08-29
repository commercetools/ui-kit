import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import AccessibleButton from '../../buttons/accessible-button';

/* FIXME: add proper tone for disabled when tones are refactored */

const getTextTone = ({ hasError, hasWarning, isDropdown, isDisabled }) => {
  if (hasError) return 'negative';
  if (hasWarning) return 'warning';
  if (isDropdown && !isDisabled) return undefined;
  return 'secondary';
};
const Currency = props => (
  <AccessibleButton
    id={props.id}
    label={props.currency}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
  >
    {/* FIXME: add proper tone for disabled when tones are refactored */}
    <Text.Detail
      tone={getTextTone({
        hasError: props.hasError,
        hasWarning: props.hasWarning,
        isDropdown: props.isDropdown,
        isDisabled: props.isDisabled,
      })}
    >
      {props.currency}
    </Text.Detail>
  </AccessibleButton>
);

Currency.displayName = 'Currency';
Currency.propTypes = {
  id: PropTypes.string,
  isDropdown: PropTypes.bool,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.string.isRequired,
};

export default Currency;
