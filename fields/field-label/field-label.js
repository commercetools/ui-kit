import PropTypes from 'prop-types';
import React from 'react';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';

export const FieldLabel = props => (
  <Spacings.Stack scale="s">
    <label>
      <Text.Body isBold={true}>
        {props.title}
        {props.isRequired ? <RequiredIndicator /> : null}
      </Text.Body>
    </label>
    {props.subtitle && (
      <Text.Detail tone="secondary">{props.subtitle}</Text.Detail>
    )}
  </Spacings.Stack>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  isRequired: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isRequired: PropTypes.bool,
};

export default FieldLabel;
