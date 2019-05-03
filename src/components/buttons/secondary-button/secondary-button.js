import PropTypes from 'prop-types';
import React from 'react';
import { oneLine } from 'common-tags';
import { Link } from 'react-router-dom';
import flowRight from 'lodash/flowRight';
import isNil from 'lodash/isNil';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import Spacings from '../../spacings';
import AccessibleButton from '../accessible-button';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import withMouseDownState from '../../../hocs/with-mouse-down-state';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { getStateStyles, getThemeStyles } from './secondary-button.styles';

// Gets the color which the icon should have based on context of button's state/cursor behavior
export const getIconColor = props => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be the same color as the theme on hover/active states
  if (
    props.theme !== 'default' &&
    (isActive || (props.isMouseOver && !props.isDisabled))
  )
    return 'info'; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.iconLeft.props.color;
};

export const SecondaryButton = props => {
  const dataProps = {
    'data-track-component': 'SecondaryButton',
    ...filterAriaAttributes(props),
    ...filterDataAttributes(props),
  };
  const isActive = props.isToggleButton && props.isToggled;
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.linkTo);

  const containerStyles = [
    css`
      display: inline-block;
      background-color: ${vars.colorSurface};
      border-radius: ${vars.borderRadius6};
      box-shadow: ${vars.shadow7};
      color: ${vars.colorSolid};
      font-size: ${vars.fontSizeDefault};
      transition: background-color ${vars.transitionLinear80Ms},
        box-shadow ${vars.transitionEaseinout150Ms};
    `,
    getStateStyles(props.isDisabled, isActive, props.theme),
    getThemeStyles(props.theme),
  ];

  const containerElements = (
    <AccessibleButton
      type={props.type}
      buttonAttributes={dataProps}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={css`
        display: flex;
        align-items: center;
        padding: 0 ${vars.spacingM};
        height: ${vars.bigButtonHeight};
      `}
    >
      <Spacings.Inline alignItems="center" scale="xs">
        {Boolean(props.iconLeft) && (
          <span
            css={css`
              margin: 0 ${vars.spacingXs} 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {React.cloneElement(props.iconLeft, {
              color: getIconColor(props),
            })}
          </span>
        )}
        <span>{props.label}</span>
      </Spacings.Inline>
    </AccessibleButton>
  );

  if (shouldUseLinkTag) {
    return (
      <Link
        css={[
          ...containerStyles,
          css`
            text-decoration: none;
          `,
        ]}
        onMouseDown={props.handleMouseDown}
        onMouseUp={props.handleMouseUp}
        onMouseOver={props.handleMouseOver}
        onMouseOut={props.handleMouseOut}
        to={props.linkTo}
      >
        {containerElements}
      </Link>
    );
  }
  return (
    <div
      css={containerStyles}
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
    >
      {containerElements}
    </div>
  );
};

SecondaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconLeft: PropTypes.node,
  isToggleButton: PropTypes.bool.isRequired,
  isToggled(props, propName, componentName, ...rest) {
    if (props.isToggleButton) {
      return PropTypes.bool.isRequired(props, propName, componentName, ...rest);
    }
    if (!isNil(props[propName]))
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the button is not a toggle button.`
      );
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  theme(props, propName, componentName, ...rest) {
    if (props[propName] !== 'default' && !props.isToggleButton) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Only toggle buttons may have a theme.`
      );
    }
    return PropTypes.oneOf(['default', 'info'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },
  isDisabled: PropTypes.bool,
  buttonAttributes: PropTypes.object,
  type: (props, propName, componentName, ...rest) => {
    // the type defaults to `button`, so we don't need to handle undefined
    if (props.linkTo && props.type !== 'button') {
      throw new Error(
        oneLine`
          ${componentName}: "${propName}" does not have any effect when
          "linkTo" is set.
        `
      );
    }
    return PropTypes.oneOf(['submit', 'reset', 'button'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },

  onClick: requiredIf(PropTypes.func, props => !props.linkTo),
  linkTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      // Would like to use objectOf(PropTypes.string), but there is a bug
      // preventing us from doing that at the momemnt
      // https://github.com/facebook/prop-types/issues/183#issuecomment-392545102
      query: PropTypes.object,
    }),
  ]),

  // HoC
  isMouseDown: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
};

SecondaryButton.defaultProps = {
  type: 'button',
  theme: 'default',
  isToggleButton: false,
};

SecondaryButton.displayName = 'SecondaryButton';

export default flowRight(
  withMouseOverState,
  withMouseDownState
)(SecondaryButton);
