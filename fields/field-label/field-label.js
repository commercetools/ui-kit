import PropTypes from 'prop-types';
import React from 'react';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import Constraints from '@commercetools-frontend/ui-kit/materials/constraints';
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';

export const FieldLabel = props => (
  <Constraints.Horizontal constraint="scale">
    <Spacings.Stack scale="xs">
      <label>
        <Spacings.Inline alignItems="flexStart" scale="xs">
          <Text.Body isBold={true} data-role="title">
            <Text.Wrap>
              {props.title}
              {props.isRequired ? <RequiredIndicator /> : null}
            </Text.Wrap>
          </Text.Body>
          {props.titleIcon &&
            React.cloneElement(props.titleIcon, {
              size: 'small',
            })}
        </Spacings.Inline>
      </label>
      <Spacings.Inline alignItems="flexEnd" scale="xs">
        {props.subtitleIcon &&
          React.cloneElement(props.subtitleIcon, {
            size: 'medium',
          })}
        {props.subtitle && (
          <Text.Detail data-role="subtitle">{props.subtitle}</Text.Detail>
        )}
      </Spacings.Inline>
      {props.hint && (
        <Text.Detail data-role="hint">
          <Text.Wrap>{props.hint}</Text.Wrap>
        </Text.Detail>
      )}
    </Spacings.Stack>
  </Constraints.Horizontal>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  isRequired: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isRequired: PropTypes.bool,
  titleIcon: PropTypes.node,
  subtitleIcon: PropTypes.node,
};

export default FieldLabel;
