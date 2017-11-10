import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import isNil from 'lodash.isnil';
import pick from 'lodash.pick';
import AccessibleButton from '../accessible-button';
import TRACKING_ATTRIBUTES from '../tracking-attributes';
import styles from './ghost-button.mod.css';

const GhostButton = props => {
  const dataProps = {
    'data-track-component': 'GhostButton',
    ...pick(props, TRACKING_ATTRIBUTES),
  };
  return (
    <AccessibleButton
      buttonAttributes={dataProps}
      label={props.label}
      onClick={props.onClick}
      isToggled={props.isToggled}
      isDisabled={props.isDisabled}
      className={styles.button}
    >
      <div
        className={classnames({
          [styles.default]: !props.isToggled && !props.isDisabled,
          [styles.active]: props.isToggled,
          [styles.disabled]: props.isDisabled,
        })}
      >
        {Boolean(props.iconLeft) &&
          React.cloneElement(props.iconLeft, {
            size: 'small',
            theme: props.isDisabled ? 'grey' : 'green',
          })}
        <span>{props.label}</span>
      </div>
    </AccessibleButton>
  );
};

GhostButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconLeft: PropTypes.node,
  isToggleButton: PropTypes.bool.isRequired,
  isToggled(props, propName, componentName, ...rest) {
    if (props.isToggleButton) {
      return PropTypes.bool.isRequired(props, propName, componentName, ...rest);
    }
    if (!isNil(props[propName]))
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${
          propName
        }\` does not have any effect when the button is not a toggle button.`
      );
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

GhostButton.defaultProps = {
  isToggleButton: false,
};

GhostButton.displayName = 'GhostButton';

export default GhostButton;
