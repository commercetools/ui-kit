import React from 'react';
import PropTypes from 'prop-types';
import Text from '@commercetools-uikit/text';

const WarningMessage = props => (
  <Text.Detail tone="warning">{props.children}</Text.Detail>
);

WarningMessage.displayName = 'WarningMessage';
WarningMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningMessage;
