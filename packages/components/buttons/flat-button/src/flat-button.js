import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import AccessibleButton from '@commercetools-uikit/accessible-button';

const propsToOmit = ['type'];

const ButtonIcon = (props) => {
  if (!props.icon) return null;

  let iconColor = 'solid';
  if (props.isDisabled) iconColor = 'neutral60';
  else if (props.tone === 'primary') iconColor = 'primary';
  else if (props.tone === 'secondary') iconColor = 'solid';
  else if (props.tone === 'inverted') iconColor = 'surface';

  const Icon = React.cloneElement(props.icon, {
    size: 'medium',
    color: iconColor,
  });

  if (props.as && props.as !== 'button') {
    return (
      <span
        css={css`
          vertical-align: middle;
        `}
      >
        {Icon}
      </span>
    );
  }
  return Icon;
};
ButtonIcon.displayName = 'ButtonIcon';
ButtonIcon.propTypes = {
  icon: PropTypes.element,
  tone: PropTypes.oneOf(['primary', 'secondary', 'inverted']),
  isDisabled: PropTypes.bool,
};

const getTextColor = (tone, isHover = false, overwrittenVars) => {
  switch (tone) {
    case 'primary':
      return isHover
        ? overwrittenVars.colorPrimary25
        : overwrittenVars.colorPrimary;
    case 'secondary':
      return overwrittenVars.colorSolid;
    case 'inverted':
      return overwrittenVars.fontColorForTextWhenInverted;
    default:
      return 'inherit';
  }
};

export const FlatButton = (props) => {
  const dataProps = {
    'data-track-component': 'FlatButton',
    ...filterInvalidAttributes(omit(props, propsToOmit)),
    // if there is a divergence between `isDisabled` and `disabled`,
    // we fall back to `isDisabled`
    disabled: props.isDisabled,
  };

  return (
    <AccessibleButton
      as={props.as}
      type={props.type}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={(theme) => {
        const overwrittenVars = {
          ...vars,
          ...theme,
        };

        return css`
          min-height: initial;
          align-items: center;
          ${props.as && props.as !== 'button'
            ? `white-space: normal;
               display: inline-block;`
            : ''};

          span {
            color: ${props.isDisabled
              ? overwrittenVars.colorNeutral
              : getTextColor(props.tone, false, overwrittenVars)};
          }

          svg * {
            fill: ${props.isDisabled
              ? overwrittenVars.colorNeutral
              : getTextColor(props.tone, false, overwrittenVars)};
          }

          * + span,
          * + svg {
            margin-left: ${vars.spacingXs};
          }

          ${!props.isDisabled
            ? `
            &:hover,
            &:focus {
              span {
                color: ${getTextColor(props.tone, true, overwrittenVars)};
              }
              svg * {
                fill: ${getTextColor(props.tone, true, overwrittenVars)};
              }
            }`
            : ''}
        `;
      }}
      buttonAttributes={dataProps}
    >
      {props.icon && props.iconPosition === 'left' && <ButtonIcon {...props} />}
      <Text.Body as="span">{props.label}</Text.Body>
      {props.icon && props.iconPosition === 'right' && (
        <ButtonIcon {...props} />
      )}
    </AccessibleButton>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  tone: PropTypes.oneOf(['primary', 'secondary', 'inverted']),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  onClick: requiredIf(PropTypes.func, (props) => !props.as),
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  isDisabled: PropTypes.bool,
};
FlatButton.defaultProps = {
  tone: 'primary',
  type: 'button',
  iconPosition: 'left',
  isDisabled: false,
};

export default FlatButton;
