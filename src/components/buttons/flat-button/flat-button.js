import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
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

const getColorTone = (tone, isHover = false) => {
  switch (tone) {
    case 'primary':
      return isHover ? vars['--color-green-25'] : vars['--color-green'];
    case 'secondary':
      return vars['--color-black'];
    default:
      return 'inherit';
  }
};

export const FlatButton = props => {
  const dataProps = {
    'data-track-component': 'LinkButton',
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

          > * + * {
            margin: 0 0 0 ${vars['--spacing-4']};
          }
          p {
            color: ${props.isDisabled
              ? vars['--color-gray']
              : getColorTone(props.tone)};
          }
          &:hover {
            p {
              color: ${props.isDisabled
                ? vars['--color-gray']
                : getColorTone(props.tone, true)};
            }
          }
        `}
        buttonAttributes={dataProps}
      >
        {props.iconPosition === 'left' && getIconElement(props)}
        <div>
          <Text.Body>{props.label}</Text.Body>
        </div>
        {props.iconPosition === 'right' && getIconElement(props)}
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
