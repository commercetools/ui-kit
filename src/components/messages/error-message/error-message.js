import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import filterDataAttributes from '../../../utils/filter-data-attributes';

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
