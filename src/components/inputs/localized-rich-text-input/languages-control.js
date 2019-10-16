import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import FlatButton from '../../buttons/flat-button';
import { WorldIcon } from '../../icons';
import messages from './messages';

const LanguagesControl = props => {
  const intl = useIntl();
  return (
    <FlatButton
      icon={<WorldIcon />}
      label={intl.formatMessage(
        props.isClosed ? messages.show : messages.hide,
        {
          remainingLanguages: props.remainingLanguages,
        }
      )}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
    />
  );
};

LanguagesControl.displayName = 'LanguagesControl';
LanguagesControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  remainingLanguages: PropTypes.number.isRequired,
};

export default LanguagesControl;
