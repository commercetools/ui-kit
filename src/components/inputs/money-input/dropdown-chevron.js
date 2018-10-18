import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import AccessibleButton from '../../buttons/accessible-button';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import messages from './messages';
import styles from './money-input.mod.css';

export const DropdownChevron = props => (
  <AccessibleButton
    label={props.intl.formatMessage(messages.chevronLabel)}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
  >
    <div className={styles.chevron}>
      {props.isOpen ? (
        <CaretUpIcon
          size="small"
          theme={props.isDisabled ? 'grey' : undefined}
        />
      ) : (
        <CaretDownIcon
          size="small"
          theme={props.isDisabled ? 'grey' : undefined}
        />
      )}
    </div>
  </AccessibleButton>
);

DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(DropdownChevron);
