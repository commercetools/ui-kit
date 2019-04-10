import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import Spacings from '../../spacings';
import AccessibleButton from '../accessible-button';

const getIconElement = props => {
  if (!props.icon) return null;

  let iconTheme = 'black';
  if (props.isDisabled) iconTheme = 'grey';
  else if (props.tone === 'primary') iconTheme = 'green';
  else if (props.tone === 'secondary' && props.isMouseOver)
    iconTheme = 'orange';

  return React.cloneElement(props.icon, {
    size: 'medium',
    theme: iconTheme,
  });
};

const getTextColor = (tone, isHover = false) => {
  switch (tone) {
    case 'primary':
      return isHover ? vars.colorPrimary25 : vars.colorPrimary;
    case 'secondary':
      return vars.colorSolid;
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
    <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
      <AccessibleButton
        type={props.type}
        label={props.label}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
        css={css`
          display: flex;
          align-items: center;
          font-size: 1rem;
          border: none;
          background: none;
          padding: 0;
          min-height: initial;
          p {
            color: ${
              props.isDisabled ? vars.colorNeutral : getTextColor(props.tone)
            };
          }
          &:hover,
          &:focus {
            p {
              color: ${
                props.isDisabled
                  ? vars.colorNeutral
                  : getTextColor(props.tone, true)
              };
            }

            svg * {
                fill: ${
                  props.isDisabled
                    ? vars.colorNeutral
                    : getTextColor(props.tone, true)
                };
              }
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
    </div>
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

  // HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};
FlatButton.defaultProps = {
  tone: 'primary',
  type: 'button',
  iconPosition: 'left',
  isDisabled: false,
};

export default withMouseOverState(FlatButton);
