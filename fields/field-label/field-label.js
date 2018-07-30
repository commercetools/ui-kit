import PropTypes from 'prop-types';
import React from 'react';
import Text from '../../typography/text';
import Spacings from '../../materials/spacings';
import styles from './field-label.mod.css';

export const FieldLabel = props => (
  <div className={styles.parent}>
    <label htmlFor={props.htmlFor}>
      <Spacings.Inline alignItems="flexStart" scale="xs">
        <Text.Wrap>
          {/*
            <Label
              tone={props.tone}
              isBold={props.isBold}
              isRequired={props.isRequired}
            >
              {props.title}
            </Label>
          */}
          {'label*'}
        </Text.Wrap>
        {props.button &&
          React.cloneElement(props.button, {
            size: 'small',
          })}
      </Spacings.Inline>
    </label>

    {(props.hint || props.hintIcon) && (
      <div className={styles.hint}>
        <Spacings.Inline alignItems="center" scale="xs">
          {props.hintIcon && (
            <span className={styles.hintIcon}>
              {// FIXME: add proper tone when tones are refactored
              React.cloneElement(props.hintIcon, {
                size: 'medium',
                theme: 'orange',
              })}
            </span>
          )}
          {props.hint && (
            <Text.Detail tone={props.tone}>{props.hint}</Text.Detail>
          )}
        </Spacings.Inline>
      </div>
    )}
    {props.description && (
      <div className={styles.description}>
        <Text.Detail tone={props.tone}>
          <Text.Wrap>{props.description}</Text.Wrap>
        </Text.Detail>
      </div>
    )}

    {props.badge && (
      <div className={styles.badge}>
        <div className={styles['label-badge']}>{props.badge}</div>
      </div>
    )}
  </div>
);

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  isRequired: false,
  isBold: false,
};
FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  button: PropTypes.node,
  hintIcon: PropTypes.node,
  badge: PropTypes.node,
  isRequired: PropTypes.bool,
  isBold: PropTypes.bool,
  tone: PropTypes.oneOf(['primary', 'inverted']),
  htmlFor: PropTypes.string,
};

export default FieldLabel;
