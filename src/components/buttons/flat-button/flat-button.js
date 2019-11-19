import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import omit from 'lodash/omit';
import requiredIf from 'react-required-if';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterInvalidAttributes } from '@commercetools-uikit/utils';
import { Body } from '@commercetools-uikit/text';
import { Inline } from '@commercetools-uikit/spacings';
import AccessibleButton from '../accessible-button';

const propsToOmit = ['type'];

const getIconElement = props => {
  if (!props.icon) return null;

  let iconColor = 'solid';
  if (props.isDisabled) iconColor = 'neutral60';
  else if (props.tone === 'primary') iconColor = 'primary';
  else if (props.tone === 'secondary' && props.isMouseOver)
    iconColor = 'warning';
  else if (props.tone === 'inverted') iconColor = 'surface';

  return React.cloneElement(props.icon, {
    size: 'medium',
    color: iconColor,
  });
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

export const FlatButton = props => {
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
      css={theme => {
        const overwrittenVars = {
          ...vars,
          ...theme,
        };

        return css`
          align-items: center;
          font-size: 1rem;
          border: none;
          background: none;
          padding: 0;
          min-height: initial;

          p {
            color: ${props.isDisabled
              ? overwrittenVars.colorNeutral
              : getTextColor(props.tone, false, overwrittenVars)};
          }

          svg * {
            fill: ${props.isDisabled
              ? overwrittenVars.colorNeutral
              : getTextColor(props.tone, false, overwrittenVars)};
          }

          &:hover,
          &:focus {
            p {
              color: ${props.isDisabled
                ? overwrittenVars.colorNeutral
                : getTextColor(props.tone, true, overwrittenVars)};
            }

            svg * {
              fill: ${props.isDisabled
                ? overwrittenVars.colorNeutral
                : getTextColor(props.tone, true, overwrittenVars)};
            }
          }
        `;
      }}
      buttonAttributes={dataProps}
    >
      <Inline scale="xs" alignItems="center">
        {props.iconPosition === 'left' && getIconElement(props)}
        <Body>{props.label}</Body>
        {props.iconPosition === 'right' && getIconElement(props)}
      </Inline>
    </AccessibleButton>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  tone: PropTypes.oneOf(['primary', 'secondary', 'inverted']),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  onClick: requiredIf(PropTypes.func, props => !props.as),
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
