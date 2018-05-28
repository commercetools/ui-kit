import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'recompose';
import invariant from 'invariant';
import isNil from 'lodash.isnil';
import pick from 'lodash.pick';
import TRACKING_ATTRIBUTES from '../tracking-attributes';
import withMouseDownState from '../../hocs/with-mouse-down-state';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import AccessibleButton from '../accessible-button';
import styles from './icon-button.mod.css';

const getStateClassNames = (isDisabled, isToggled) =>
  classnames({
    [styles.default]: !isToggled && !isDisabled,
    [styles.active]: isToggled,
    [styles.disabled]: isDisabled,
  });

// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconThemeColor = props => {
  // if button has a theme, icon should be white when hovering/clicking
  if (
    props.theme !== 'default' &&
    (props.isToggled || (props.isMouseOver && !props.isDisabled))
  )
    return 'white';

  // if button is disabled, icon should be grey
  if (props.isDisabled && !props.isToggled) return 'grey';
  // if button is not disabled nor has a theme, return icon's default color
  return props.icon.props.theme;
};

const getShapeClassName = shape => styles[shape];
const getSizeClassName = size => styles[`container-${size}`];
const getThemeClassName = theme => {
  if (!theme) return undefined;

  const themeClassName = styles[`theme-${theme}`];

  // Whenever a theme is specified a fitting theme className should
  // be available except for the default theme.
  invariant(
    themeClassName || theme === 'default',
    `ui-kit/icons/buttons/icon-button: the specified theme '${theme}' is not supported.`
  );

  return themeClassName;
};

export const IconButton = props => {
  const dataProps = {
    'data-track-component': 'IconButton',
    ...pick(props, TRACKING_ATTRIBUTES),
  };
  return (
    <div
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      className={classnames(
        styles['button-appearance'],
        getStateClassNames(props.isDisabled, props.isToggled),
        getShapeClassName(props.shape),
        getSizeClassName(props.size),
        getThemeClassName(props.theme)
      )}
    >
      <AccessibleButton
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        className={styles[`container-${props.size}`]}
      >
        <div
          className={classnames(
            styles['button-layout'],
            styles[`container-${props.size}`]
          )}
        >
          {props.icon &&
            React.cloneElement(props.icon, {
              size: props.size !== 'big' ? 'small' : 'big',
              theme: getIconThemeColor(props),
            })}
        </div>
      </AccessibleButton>
    </div>
  );
};

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
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
  isDisabled: PropTypes.bool,
  /* FIXME: onClick should be required.
    There are still some places where we can't pass it yet.
    Check the spreadsheet to see where;
  */
  onClick: PropTypes.func,
  shape: PropTypes.oneOf(['round', 'square']),
  size: PropTypes.oneOf(['small', 'medium', 'big']),
  theme(props, propName, componentName, ...rest) {
    if (props[propName] !== 'default' && !props.isToggleButton) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Only toggle buttons may have a theme.`
      );
    }
    return PropTypes.oneOf(['default', 'green', 'blue'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },

  // HoC
  isMouseDown: PropTypes.bool.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  theme: 'default',
  size: 'big',
  shape: 'round',
  isToggleButton: false,
};

IconButton.displayName = 'IconButton';

export default compose(
  withMouseOverState,
  withMouseDownState
)(IconButton);
