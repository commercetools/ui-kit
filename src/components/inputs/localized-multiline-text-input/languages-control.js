import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import Icons from '../../icons';
import messages from './messages';

const LanguagesControl = ({
  remainingLanguages,
  onClick,
  intl,
  isClosed,
  isDisabled,
}) => (
  <FlatButton
    icon={<Icons.World />}
    label={intl.formatMessage(isClosed ? messages.show : messages.hide, {
      remainingLanguages,
    })}
    onClick={onClick}
    isDisabled={isDisabled}
  />
);

LanguagesControl.displayName = 'LanguagesControl';
LanguagesControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  remainingLanguages: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(LanguagesControl);
