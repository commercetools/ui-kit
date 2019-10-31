import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import React from 'react';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import IconButton from '../buttons/icon-button';
import { InformationIcon } from '../icons';
import Text from '../typography/text';
import Label from '../label';
import Constraints from '../constraints';
import Spacings from '../spacings';

export const FieldLabel = props => {
  if (props.hintIcon && props.hintIcon.props && props.hintIcon.props.size) {
    invariant(
      false,
      `ui-kit/FieldLabel: setting an hintIcon size is not supported.`
    );
  }
  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <Spacings.Inline alignItems="flexStart" scale="xs">
          <Text.Wrap>
            <Label
              isBold={true}
              isRequiredIndicatorVisible={props.hasRequiredIndicator}
              htmlFor={props.htmlFor}
              tone={props.tone}
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

        {props.hint && (
          <Spacings.Inline alignItems="center" scale="xs">
            {props.hintIcon && (
              <Spacings.Inline>
                {React.cloneElement(props.hintIcon, {
                  // FIXME: add proper tone when tones are refactored
                  size: 'medium',
                  color: props.hintIcon.props.color || 'warning',
                })}
              </Spacings.Inline>
            )}
            {props.hint && (
              <Text.Detail tone={props.tone}>{props.hint}</Text.Detail>
            )}
          </Spacings.Inline>
        )}
        {props.description && (
          <Text.Detail tone={props.tone}>
            <Text.Wrap>{props.description}</Text.Wrap>
          </Text.Detail>
        )}

        {props.badge && (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            {props.badge}
          </div>
        )}
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};

FieldLabel.displayName = 'FieldLabel';

FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    props => props.hintIcon
  ),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onInfoButtonClick: PropTypes.func,
  tone: PropTypes.oneOf(['primary', 'inverted']),
  hintIcon: PropTypes.node,
  badge: PropTypes.node,
  hasRequiredIndicator: PropTypes.bool,
  htmlFor: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

FieldLabel.defaultProps = {
  horizontalConstraint: 'scale',
};

export default FieldLabel;
