import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../../materials/spacings';
import BaseButtonWrapper from '../base-button-wrapper';
import styles from './primary-action-button.mod.css';

const getClassName = ({ isToggled, isDisabled }) => {
  if (isDisabled) return styles.disabled;
  if (isToggled) return styles.active;
  return styles.button;
};

export const ButtonContent = props => (
  <span
    className={classnames(
      getClassName({
        isToggled: props.isToggled,
        isDisabled: props.isDisabled,
      }),
      styles[props.size]
    )}
  >
    <Spacings.Inline scale="xs" alignItems="center">
      {props.icon &&
        // FIXME: add proper tone when tones are refactored
        React.cloneElement(props.icon, {
          theme: props.isDisabled ? 'grey' : 'white',
          size: props.size === 'big' ? 'big' : 'medium',
        })}
      <span>{props.children}</span>
    </Spacings.Inline>
  </span>
);

const PrimaryActionButton = props => (
  <BaseButtonWrapper {...props}>
    <ButtonContent {...props} />
  </BaseButtonWrapper>
);

PrimaryActionButton.displayName = 'PrimaryActionButton';

PrimaryActionButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  dataAttr: PropTypes.object,
  isDisabled: PropTypes.bool,
  isToggled: PropTypes.bool,
  icon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  size: PropTypes.oneOf(['small', 'big']),
};

PrimaryActionButton.defaultProps = {
  size: 'big',
  type: 'button',
};

ButtonContent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  dataAttr: PropTypes.object,
  isDisabled: PropTypes.bool,
  isToggled: PropTypes.bool,
  icon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  size: PropTypes.oneOf(['small', 'big']),
};

export default PrimaryActionButton;
