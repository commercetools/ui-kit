import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import FlatButton from '@commercetools-uikit/flat-button';
import { CoinsIcon } from '@commercetools-uikit/icons';
import messages from './messages';

const CurrencyControl = (props) => {
  const intl = useIntl();

  return (
    <FlatButton
      icon={<CoinsIcon />}
      label={intl.formatMessage(
        props.isClosed ? messages.show : messages.hide,
        {
          remainingCurrencies: props.remainingCurrencies,
        }
      )}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
    />
  );
};

CurrencyControl.displayName = 'CurrencyControl';
CurrencyControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  remainingCurrencies: PropTypes.number.isRequired,
};

export default CurrencyControl;
