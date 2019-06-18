import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import Spacings from '../../spacings';
import AccessibleButton from '../accessible-button';

const getIconElement = props => {
  if (!props.icon) return null;

  return React.cloneElement(props.icon, {
    size: 'medium',
  });
};

const getTextColor = (tone, isHover = false, theme) => {
  const overwrittenVars = {
    ...vars,
    ...theme,
  };

  switch (tone) {
    case 'primary':
      return isHover
        ? overwrittenVars.colorPrimary25
        : overwrittenVars.colorPrimary;
    case 'secondary':
      return overwrittenVars.colorSolid;
    default:
      return 'inherit';
  }
};

export const FlatButton = props => {
  const dataProps = {
    'data-track-component': 'FlatButton',
    ...filterAriaAttributes(props),
    ...filterDataAttributes(props),
  };

  return (
    <AccessibleButton
      type={props.type}
      label={props.label}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
      css={theme => css`
        display: flex;
        align-items: center;
        font-size: 1rem;
        border: none;
        background: none;
        padding: 0;
        min-height: initial;

        p {
          color: ${props.isDisabled
            ? vars.colorNeutral
            : getTextColor(props.tone, false, theme)};
        }

        svg * {
          fill: ${props.isDisabled
            ? vars.colorNeutral
            : getTextColor(props.tone, false, theme)};
        }

        &:hover,
        &:focus {
          p {
            color: ${props.isDisabled
              ? vars.colorNeutral
              : getTextColor(props.tone, true, theme)};
          }

          svg * {
            fill: ${props.isDisabled
              ? vars.colorNeutral
              : getTextColor(props.tone, true, theme)};
          }
        }
      `}
      buttonAttributes={dataProps}
    >
      <Spacings.Inline scale="xs" alignItems="center">
        {props.iconPosition === 'left' && getIconElement(props)}
        <Text.Body>{props.label}</Text.Body>
        {props.iconPosition === 'right' && getIconElement(props)}
      </Spacings.Inline>
    </AccessibleButton>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.propTypes = {
  tone: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
