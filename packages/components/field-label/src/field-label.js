import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import { IconButton } from '@commercetools-uikit/buttons';
import { InformationIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import Inline from '@commercetools-uikit/spacings-inline';
import Label from '@commercetools-uikit/label';

export const FieldLabel = (props) => {
  if (props.hintIcon && props.hintIcon.props && props.hintIcon.props.size) {
    invariant(
      false,
      `ui-kit/FieldLabel: setting an hintIcon size is not supported.`
    );
  }
  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Stack scale="xs">
        <Inline alignItems="flexStart" scale="xs">
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
        </Inline>

        {props.hint && (
          <Inline alignItems="flexStart" scale="xs">
            {props.hintIcon && (
              <Inline>
                {React.cloneElement(props.hintIcon, {
                  // FIXME: add proper tone when tones are refactored
                  size: 'medium',
                  color: props.hintIcon.props.color || 'warning',
                })}
              </Inline>
            )}
            {props.hint && (
              <Text.Detail tone={props.tone}>{props.hint}</Text.Detail>
            )}
          </Inline>
        )}
        {props.description && (
          <Text.Wrap>
            <Text.Detail tone={props.tone}>{props.description}</Text.Detail>
          </Text.Wrap>
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
      </Stack>
    </Constraints.Horizontal>
  );
};

FieldLabel.displayName = 'FieldLabel';

FieldLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    (props) => props.hintIcon
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
