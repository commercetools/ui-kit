import React from 'react';
import invariant from 'tiny-invariant';
import IconButton from '../buttons/icon-button';
import { InformationIcon } from '../icons';
import Text from '../typography/text';
import Label from '../label';
import Constraints from '../constraints';
import Spacings from '../spacings';
import styles from './field-label.mod.css';

type HorizontalConstraintOfFieldLabel = 's' | 'm' | 'l' | 'xl' | 'scale';
type FieldLabelProps = {
  title: React.ReactNode;
  hint: React.ReactNode;
  description: React.ReactNode;
  onInfoButtonClick?: () => void;
  hintIcon: React.ReactElement<any>;
  badge: React.ReactNode;
  hasRequiredIndicator?: boolean;
  htmlFor?: string;
  horizontalConstraint: HorizontalConstraintOfFieldLabel;
};

export const FieldLabel: React.FC<FieldLabelProps> = props => {
  invariant(
    props.hint && !props.hintIcon,
    'ui-kit/FieldLabel: please pass `hintIcon` when label has hint.'
  );

  return (
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
                  theme: props.hintIcon.props.theme || 'orange',
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
};

FieldLabel.displayName = 'FieldLabel';

FieldLabel.defaultProps = {
  horizontalConstraint: 'scale',
};

export default FieldLabel;
