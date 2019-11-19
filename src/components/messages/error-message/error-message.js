import React from 'react';
import PropTypes from 'prop-types';
import { Detail } from '@commercetools-uikit/text';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const ErrorMessage = props => (
  <Detail tone="negative" {...filterDataAttributes(props)}>
    {props.children}
  </Detail>
);
ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
