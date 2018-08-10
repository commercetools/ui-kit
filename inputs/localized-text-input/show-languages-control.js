import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import { WorldIcon } from '../../icons';
import messages from './messages';

const ShowLanguagesControl = ({ remainingLanguages, onClick, isOpen, intl }) =>
  isOpen ? (
    <FlatButton
      icon={<WorldIcon />}
      label={intl.formatMessage(messages.collapse)}
      onClick={onClick}
    />
  ) : (
    <FlatButton
      icon={<WorldIcon />}
      label={intl.formatMessage(messages.expand, { remainingLanguages })}
      onClick={onClick}
    />
  );
ShowLanguagesControl.displayName = 'ShowLanguagesControl';
ShowLanguagesControl.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  remainingLanguages: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(ShowLanguagesControl);
