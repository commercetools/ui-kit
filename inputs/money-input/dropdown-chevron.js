import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import AccessibleButton from '../../buttons/accessible-button';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import messages from './messages';

export const DropdownChevron = props => (
  <AccessibleButton
    label={props.intl.formatMessage(messages.chevronLabel)}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
  >
    {props.isOpen ? (
      <CaretUpIcon size="small" theme={props.isDisabled ? 'grey' : undefined} />
    ) : (
      <CaretDownIcon
        size="small"
        theme={props.isDisabled ? 'grey' : undefined}
      />
    )}
  </AccessibleButton>
);

DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(DropdownChevron);
