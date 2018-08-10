import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import { WorldIcon } from '../../icons';
import messages from './messages';

const HideLanguagesControl = ({ onClick, remainingLanguages, intl }) => (
  <FlatButton
    icon={<WorldIcon />}
    label={intl.formatMessage(messages.hide, { remainingLanguages })}
    onClick={onClick}
  />
);
HideLanguagesControl.displayName = 'HideLanguagesControl';
HideLanguagesControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  remainingLanguages: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(HideLanguagesControl);
