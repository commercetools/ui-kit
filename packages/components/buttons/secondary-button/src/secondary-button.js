import PropTypes from 'prop-types';
import React from 'react';
import { oneLine } from 'common-tags';
import { Link } from 'react-router-dom';
import isNil from 'lodash/isNil';
import requiredIf from 'react-required-if';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import Inline from '@commercetools-uikit/spacings-inline';
import {
  filterInvalidAttributes,
  warnDeprecatedProp,
} from '@commercetools-uikit/utils';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { getStateStyles, getThemeStyles } from './secondary-button.styles';

// Gets the color which the icon should have based on context of button's state/cursor behavior
export const getIconColor = (props) => {
  const isActive = props.isToggleButton && props.isToggled;
  // if button has a theme, icon should be the same color as the theme on active state
  if (props.theme !== 'default' && isActive && !props.isDisabled) return 'info'; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'neutral60';
  // if button is not disabled nor has a theme, return icon's default color
  return props.iconLeft.props.color;
};

const SecondaryButton = (props) => {
  const isActive = props.isToggleButton && props.isToggled;
  const shouldUseLinkTag = !props.isDisabled && Boolean(props.linkTo);

  const asProps = shouldUseLinkTag ? { as: Link } : { as: props.as };

  const buttonAttributes = {
    'data-track-component': 'SecondaryButton',
    ...filterInvalidAttributes(props),
    ...(shouldUseLinkTag ? { to: props.linkTo } : {}),
  };

  const containerStyles = [
    css`
      display: inline-flex;
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

  return (
    <AccessibleButton
      {...asProps}
      type={props.type}
      buttonAttributes={buttonAttributes}
      label={props.label}
      onClick={props.onClick}
      isToggleButton={props.isToggleButton}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      css={[
        css`
          display: flex;
          align-items: center;
          padding: 0 ${vars.spacingM};
          height: ${vars.bigButtonHeight};
        `,
      ].concat(containerStyles)}
    >
      <Inline alignItems="center" scale="xs">
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
      </Inline>
    </AccessibleButton>
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
    if (props.as && props.type !== 'button') {
      throw new Error(
        oneLine`
          ${componentName}: "${propName}" does not have any effect when
          "as" is set.
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

  onClick: requiredIf(PropTypes.func, (props) => {
    return !props.linkTo && !props.as;
  }),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  to(props, propName, componentName, ...rest) {
    if (props[propName] != null) {
      if (!props.as) {
        return new Error(oneLine`
          Invalid prop "${propName}" supplied to "${componentName}".
          "${propName}" does not have any effect when "as" is not defined`);
      }

      return PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          search: PropTypes.string,
          query: PropTypes.objectOf(PropTypes.string),
        }),
      ])(props, propName, componentName, ...rest);
    }

    return PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        query: PropTypes.objectOf(PropTypes.string),
      }),
    ])(props, propName, componentName, ...rest);
  },
  linkTo(props, propName, componentName, ...rest) {
    // here
    if (props[propName] != null) {
      warnDeprecatedProp(
        propName,
        componentName,
        `\n Please use "as" prop instead.`
      );

      if (props.as) {
        return new Error(oneLine`
          Invalid prop "${propName}" supplied to "${componentName}".
          "${propName}" does not have any effect when "as" is defined`);
      }

      return PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          search: PropTypes.string,
          query: PropTypes.objectOf(PropTypes.string),
        }),
      ])(props, propName, componentName, ...rest);
    }
    return PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        query: PropTypes.objectOf(PropTypes.string),
      }),
    ])(props, propName, componentName, ...rest);
  },
};

SecondaryButton.defaultProps = {
  type: 'button',
  theme: 'default',
  isToggleButton: false,
};

SecondaryButton.displayName = 'SecondaryButton';

export { SecondaryButton };
