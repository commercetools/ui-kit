import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import isNil from 'lodash.isnil';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import AccessibleButton from '../accessible-button';
import styles from './primary-button.mod.css';

const getButtonClassNames = ({ isToggled, isDisabled }) => {
  if (isDisabled) return styles.disabled;
  if (isToggled) return styles.active;
  return styles.button;
};

const PrimaryButton = props => {
  const dataProps = {
    'data-track-component': 'PrimaryButton',
    ...filterDataAttributes(props),
  };
  return (
    <div
      className={classnames(styles[`button-layout-${props.size}`], {
        [styles[`button-tone-${props.tone}`]]: !props.isDisabled,
      })}
    >
      <AccessibleButton
        type={props.type}
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isToggled={props.isToggled}
        isDisabled={props.isDisabled}
        className={getButtonClassNames({
          isToggled: props.isToggled,
          isDisabled: props.isDisabled,
        })}
      >
        {Boolean(props.iconLeft) && (
          <span className={styles['icon-container']}>
            {React.cloneElement(props.iconLeft, {
              theme: props.isDisabled ? 'grey' : 'white',
            })}
          </span>
        )}
        <span>{props.label}</span>
      </AccessibleButton>
    </div>
  );
};

PrimaryButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  buttonAttributes: PropTypes.object,
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
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['big', 'small']),
  tone: PropTypes.oneOf(['urgent', 'primary']),
};
PrimaryButton.defaultProps = {
  type: 'button',
  size: 'big',
  isToggleButton: false,
  tone: 'primary',
};
PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
