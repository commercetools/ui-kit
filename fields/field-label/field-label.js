import PropTypes from 'prop-types';
import React from 'react';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import RequiredIndicator from './required-indicator';
import styles from './field-label.mod.css';

export const FieldLabel = props => (
  <div className={styles['label-container']}>
    <div>
      <label htmlFor={props.htmlFor}>
        <Spacings.Inline alignItems="flexStart" scale="xs">
          <Text.Wrap>
            <Text.Body
              tone={props.tone}
              isBold={props.isBold}
              data-test-role="title"
            >
              {props.title}
              {props.isRequired ? <RequiredIndicator /> : null}
            </Text.Body>
          </Text.Wrap>
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
          <Text.Detail tone={props.tone} data-test-role="subtitle">
            {props.subtitle}
          </Text.Detail>
        )}
      </Spacings.Inline>
      {props.hint && (
        <Text.Detail tone={props.tone} data-test-role="hint">
          <Text.Wrap>{props.hint}</Text.Wrap>
        </Text.Detail>
      )}
    </div>
    {props.badge && <div className={styles['label-badge']}>{props.badge}</div>}
  </div>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  isRequired: false,
  isBold: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleIcon: PropTypes.node,
  subtitleIcon: PropTypes.node,
  badge: PropTypes.node,
  isRequired: PropTypes.bool,
  isBold: PropTypes.bool,
  tone: PropTypes.oneOf([
    'primary',
    'secondary',
    'positive',
    'negative',
    'inverted',
  ]),
  htmlFor: PropTypes.string,
};

export default FieldLabel;
