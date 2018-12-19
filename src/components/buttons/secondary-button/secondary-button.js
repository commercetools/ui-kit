import PropTypes from 'prop-types';
import React from 'react';
import oneLine from 'common-tags/lib/oneLine';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { compose } from 'recompose';
import invariant from 'tiny-invariant';
import isNil from 'lodash.isnil';
import requiredIf from 'react-required-if';
import Spacings from '../../spacings';
import AccessibleButton from '../accessible-button';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import withMouseDownState from '../../../hocs/with-mouse-down-state';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import styles from './secondary-button.mod.css';

const Div = props => <div {...props} />;
Div.displayName = 'Div';

const getStateClassNames = (isDisabled, isToggled) =>
  classnames({
    [styles.default]: !isToggled && !isDisabled,
    [styles.active]: isToggled,
    [styles.disabled]: isDisabled,
  });

// Gets the color which the icon should have based on context of button's state/cursor behavior
export const getIconThemeColor = props => {
  // if button has a theme, icon should be the same color as the theme on hover/active states
  if (
    props.theme !== 'default' &&
    (props.isToggled || (props.isMouseOver && !props.isDisabled))
  )
    return props.theme; // returns the passed in theme without overwriting
  // if button is disabled, icon should be grey
  if (props.isDisabled) return 'grey';
  // if button is not disabled nor has a theme, return icon's default color
  return props.iconLeft.props.theme;
};

const getThemeClassName = theme => {
  if (!theme) return undefined;

  const themeClassName = styles[`theme-${theme}`];

  // Whenever a theme is specified a fitting theme className should
  // be available except for the default theme.
  invariant(
    themeClassName || theme === 'default',
    `ui-kit/SecondaryButton: the specified theme '${theme}' is not supported.`
  );

  return themeClassName;
};

export const SecondaryButton = props => {
  const dataProps = {
    'data-track-component': 'SecondaryButton',
    ...filterDataAttributes(props),
  };

  const shouldLink = !props.isDisabled && Boolean(props.linkTo);
  const WrapperComponent = shouldLink ? Link : Div;

  return (
    <WrapperComponent
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      className={classnames(
        styles.container,
        styles['button-appearance'],
        getStateClassNames(props.isDisabled, props.isToggled),
        getThemeClassName(props.theme)
      )}
      to={shouldLink ? props.linkTo : undefined}
    >
      <AccessibleButton
        type={props.type}
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        className={styles.button}
      >
        <Spacings.Inline alignItems="center" scale="xs">
          {Boolean(props.iconLeft) && (
            <span className={styles['icon-container']}>
              {React.cloneElement(props.iconLeft, {
                theme: getIconThemeColor(props),
              })}
            </span>
          )}
          <span>{props.label}</span>
        </Spacings.Inline>
      </AccessibleButton>
    </WrapperComponent>
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
    return PropTypes.oneOf(['default', 'blue'])(
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

export default compose(
  withMouseOverState,
  withMouseDownState
)(SecondaryButton);
