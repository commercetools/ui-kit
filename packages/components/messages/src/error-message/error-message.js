import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Text from '@commercetools-uikit/text';
import { filterDataAttributes } from '@commercetools-uikit/utils';

const intlMessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  defaultMessage: PropTypes.string.isRequired,
});

const ErrorMessage = props => (
  <Text.Detail
    intlMessage={props.intlMessage}
    tone="negative"
    {...filterDataAttributes(props)}
  >
    {props.children}
  </Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = {
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
  intlMessage: requiredIf(
    intlMessageShape,
    props => !React.Children.count(props.children)
  ),
};

export default ErrorMessage;
