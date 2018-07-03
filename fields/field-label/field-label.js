import PropTypes from 'prop-types';
import React from 'react';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';

export const FieldLabel = ({ title, subtitle, isRequired, className }) => (
  <div className={className}>
    <Spacings.Stack scale="s">
      <Spacings.Inline scale="s">
        <Text.Body isBold={true}>
          {title}
          {isRequired ? <RequiredIndicator /> : null}
        </Text.Body>
      </Spacings.Inline>
      {subtitle && (
        <Spacings.Inline>
          <Text.Body tone="secondary">{subtitle}</Text.Body>
        </Spacings.Inline>
      )}
    </Spacings.Stack>
  </div>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  isRequired: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isRequired: PropTypes.bool,

  // for custom styles
  className: PropTypes.string,
};

export default FieldLabel;
