import React from 'react';
import PropTypes from 'prop-types';
import Text from '@commercetools-uikit/text';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const ErrorMessage = props => (
  <Text.Detail tone="negative" {...filterDataAttributes(props)}>
    {props.children}
  </Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
