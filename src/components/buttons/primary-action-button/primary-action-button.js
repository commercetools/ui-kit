import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../../materials/spacings';
import BaseButtonWrapper from '../base-button-wrapper';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import styles from './primary-action-button.mod.css';

const getStateClassName = ({ isToggled, isDisabled }) => {
  if (isDisabled) return styles.disabled;
  if (isToggled) return styles.active;
  return styles.button;
};

const getSizeClassName = size => styles[size];

export const ButtonContent = props => (
  <span
    className={classnames(
      getStateClassName({
        isToggled: props.isToggled,
        isDisabled: props.isDisabled,
      }),
      getSizeClassName(props.size)
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

const PrimaryActionButton = props => {
  const dataProps = {
    'data-track-component': 'PrimaryActionButton',
    ...filterDataAttributes(props),
  };

  return (
    <BaseButtonWrapper
      dataAttr={{
        ...dataProps,
        ...props.dataAttr,
      }}
      {...props}
    >
      <ButtonContent {...props} />
    </BaseButtonWrapper>
  );
};

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
