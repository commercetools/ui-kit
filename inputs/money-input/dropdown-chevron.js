import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import AccessibleButton from '../../buttons/accessible-button';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import styles from './money-input.mod.css';
import messages from './messages';

export const DropdownChevron = props => (
  <AccessibleButton
    label={props.intl.formatMessage(messages.chevronLabel)}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    className={classnames(styles['chevron-icon'], {
      [styles['chevron-icon-disabled']]: props.isDisabled,
    })}
  >
    <div className={styles['icon-wrapper']}>
      {props.isOpen ? (
        <CaretUpIcon size="scale" />
      ) : (
        <CaretDownIcon size="scale" />
      )}
    </div>
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
