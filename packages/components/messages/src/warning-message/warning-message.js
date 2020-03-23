import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Text from '@commercetools-uikit/text';

const intlMessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  defaultMessage: PropTypes.string.isRequired,
});

const WarningMessage = (props) => (
  <Text.Detail intlMessage={props.intlMessage} tone="warning">
    {props.children}
  </Text.Detail>
);

WarningMessage.displayName = 'WarningMessage';
WarningMessage.propTypes = {
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
};

export default WarningMessage;
