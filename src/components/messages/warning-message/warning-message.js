import React from 'react';
import PropTypes from 'prop-types';
import { Detail } from '@commercetools-uikit/text';

const WarningMessage = props => (
  <Detail tone="warning">{props.children}</Detail>
);

WarningMessage.displayName = 'WarningMessage';
WarningMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningMessage;
