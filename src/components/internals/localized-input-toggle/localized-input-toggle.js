import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import FlatButton from '@commercetools-uikit/flat-button';
import { WorldIcon } from '@commercetools-uikit/icons';
import messages from '../messages/localized-input/messages';

const LocalizedInputToggle = (props) => {
  const intl = useIntl();

  const labelMessage = props.isOpen ? props.hideMessage : props.showMessage;
  const label =
    typeof labelMessage === 'string'
      ? labelMessage
      : intl.formatMessage(labelMessage, {
          remainingLanguages: props.remainingLocalizations,
        });

  return (
    <FlatButton
      icon={props.icon ? props.icon : <WorldIcon />}
      label={label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
    />
  );
};

const intlMessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  defaultMessage: PropTypes.string.isRequired,
});

LocalizedInputToggle.displayName = 'LocalizedInputToggle';
LocalizedInputToggle.propTypes = {
  icon: PropTypes.node,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  showMessage: PropTypes.oneOfType([PropTypes.string, intlMessageShape])
    .isRequired,
  hideMessage: PropTypes.oneOfType([PropTypes.string, intlMessageShape])
    .isRequired,
  remainingLocalizations: PropTypes.number,
};
LocalizedInputToggle.defaultProps = {
  hideMessage: messages.hide,
  showMessage: messages.show,
};

export default LocalizedInputToggle;
