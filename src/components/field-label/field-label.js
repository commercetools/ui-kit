import PropTypes from 'prop-types';
import React from 'react';
import requiredIf from 'react-required-if';
import IconButton from '../buttons/icon-button';
import { InformationIcon } from '../icons';
import Text from '../typography/text';
import Label from '../label';
import Constraints from '../constraints';
import Spacings from '../spacings';
import styles from './field-label.mod.css';

export const FieldLabel = props => (
  <Constraints.Horizontal constraint={props.horizontalConstraint}>
    <div className={styles.label}>
      <Spacings.Inline alignItems="flexStart" scale="xs">
        <Text.Wrap>
          <Label
            isBold={true}
            isRequiredIndicatorVisible={props.hasRequiredIndicator}
            htmlFor={props.htmlFor}
          >
            {props.title}
          </Label>
        </Text.Wrap>
        {props.onInfoButtonClick && (
          <IconButton
            label="More Info"
            icon={<InformationIcon size="medium" />}
            size="small"
            onClick={props.onInfoButtonClick}
          />
        )}
      </Spacings.Inline>
    </div>

    {props.hint && (
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
          {props.hint && <Text.Detail>{props.hint}</Text.Detail>}
        </Spacings.Inline>
      </div>
    )}
    {props.description && (
      <div className={styles.description}>
        <Text.Detail>
          <Text.Wrap>{props.description}</Text.Wrap>
        </Text.Detail>
      </div>
    )}

    {props.badge && (
      <div className={styles.badge}>
        <div className={styles['label-badge']}>{props.badge}</div>
      </div>
    )}
  </Constraints.Horizontal>
);

FieldLabel.displayName = 'FieldLabel';

FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    props => props.hintIcon
  ),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onInfoButtonClick: PropTypes.func,
  hintIcon: PropTypes.node,
  badge: PropTypes.node,
  hasRequiredIndicator: PropTypes.bool,
  htmlFor: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
};

FieldLabel.defaultProps = {
  horizontalConstraint: 'scale',
};

export default FieldLabel;
