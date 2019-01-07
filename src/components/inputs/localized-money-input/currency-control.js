import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import { CoinsIcon } from '../../icons';
import messages from './messages';

const CurrencyControl = ({
  remainingCurrencies,
  onClick,
  intl,
  isClosed,
  isDisabled,
}) => (
  <FlatButton
    icon={<CoinsIcon />}
    label={intl.formatMessage(isClosed ? messages.show : messages.hide, {
      remainingCurrencies,
    })}
    onClick={onClick}
    isDisabled={isDisabled}
  />
);

CurrencyControl.displayName = 'CurrencyControl';
CurrencyControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  remainingCurrencies: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(CurrencyControl);
