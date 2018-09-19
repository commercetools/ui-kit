import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import filterAriaAttributes from '../../../utils/filter-aria-attributes';
import Spacings from '../../spacings';
import styles from './primary-action-button.mod.css';

const getStateClassName = ({ isToggled, isDisabled }) => {
  if (isDisabled) return styles.disabled;
  if (isToggled) return styles.active;
  return styles.button;
};
const getSizeClassName = size => styles[size];

const PrimaryActionButton = props => {
  const dataProps = {
    'data-track-component': 'PrimaryActionButton',
    ...filterDataAttributes(props),
  };
  const ariaProps = {
    'aria-label': props['aria-label'],
    'aria-disabled': props.isDisabled,
    'aria-pressed': props.isToggled,
    ...filterAriaAttributes(props),
  };
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className={styles.reset}
      type={props.type}
      {...dataProps}
      {...ariaProps}
    >
      <div
        className={classnames(
          getStateClassName({
            isToggled: props.isToggled,
            isDisabled: props.isDisabled,
          }),
          getSizeClassName(props.size)
        )}
      >
        <Spacings.Inline scale="xs" alignItems="center">
          {Boolean(props.iconLeft) &&
            React.cloneElement(props.iconLeft, {
              theme: props.isDisabled ? 'grey' : 'white',
            })}
          <span>{props.label}</span>
        </Spacings.Inline>
      </div>
    </button>
  );
};

PrimaryActionButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  'aria-label': PropTypes.string,
  iconLeft: PropTypes.node,
  isToggled: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['big', 'small']),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),

  // DEPRECATED
  tone(props, propName, componentName, ...rest) {
    if (props.tone) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` is deprecated. Render a different button instead (e.G \`CriticalActionButton\` if tone is \`urgent\`)`
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
  isToggleButton(props, propName, componentName, ...rest) {
    if (props.isToggleButton) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` is deprecated. The button will be shown as toggled if \`isToggled\` is passed`
      );
    }
    return PropTypes.bool(props, propName, componentName, ...rest);
  },
};
PrimaryActionButton.defaultProps = {
  size: 'big',
  type: 'button',
};
PrimaryActionButton.displayName = 'PrimaryActionButton';

export default PrimaryActionButton;
