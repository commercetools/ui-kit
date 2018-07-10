import PropTypes from 'prop-types';
import React from 'react';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';
import styles from './field-label.mod.css';

export const FieldLabel = props => (
  <div className={styles['label-container']}>
    <Spacings.Stack scale="xs">
      <label className={styles['label-title']}>
        <Spacings.Inline scale="xs">
          <Text.Body isBold={true}>
            {props.title}
            {props.isRequired ? <RequiredIndicator /> : null}
          </Text.Body>
          {props.titleIcon &&
            React.cloneElement(props.titleIcon, {
              size: 'small',
            })}
        </Spacings.Inline>
      </label>
      {props.subtitle && (
        <Text.Detail tone="secondary">{props.subtitle}</Text.Detail>
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
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isRequired: PropTypes.bool,
  titleIcon: PropTypes.node,
};

export default FieldLabel;
