import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import { WorldIcon } from '../../icons';
import messages from './messages';

const LanguagesButton = ({
  remainingLanguages,
  onClick,
  isOpen,
  intl,
  isDisabled,
}) =>
  isOpen ? (
    <FlatButton
      icon={<WorldIcon />}
      label={intl.formatMessage(messages.collapse, { remainingLanguages })}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  ) : (
    <FlatButton
      icon={<WorldIcon />}
      label={intl.formatMessage(messages.expand, { remainingLanguages })}
      onClick={onClick}
    />
  );
LanguagesButton.displayName = 'LanguagesButton';
LanguagesButton.propTypes = {
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  remainingLanguages: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(LanguagesButton);
