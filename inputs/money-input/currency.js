import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import AccessibleButton from '../../buttons/accessible-button';

const Currency = props => (
  <AccessibleButton
    label={props.currency}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
  >
    {/* FIXME: add proper tone for disabled when tones are refactored */}
    <Text.Detail tone={props.isDropdown ? undefined : 'secondary'}>
      {props.currency}
    </Text.Detail>
  </AccessibleButton>
);

Currency.displayName = 'Currency';
Currency.propTypes = {
  isDropdown: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.string.isRequired,
};

export default Currency;
