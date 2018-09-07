import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseButtonWrapper, { BaseButtonContent } from '../base-button-wrapper';
import filterDataAttributes from '../../../utils/filter-data-attributes';
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

  return (
    <BaseButtonWrapper
      id={props.id}
      name={props.name}
      ref={props.ref}
      ariaLabel={props.ariaLabel}
      onClick={props.onClick}
      dataAttr={{
        ...dataProps,
        ...props.dataAttr,
      }}
      isDisabled={props.isDisabled}
      isToggled={props.isToggled}
      type={props.type}
    >
      <BaseButtonContent
        styles={classnames(
          getStateClassName({
            isToggled: props.isToggled,
            isDisabled: props.isDisabled,
          }),
          getSizeClassName(props.size)
        )}
        icon={props.icon}
        isDisabled={props.isDisabled}
      >
        {props.children}
      </BaseButtonContent>
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
  onClick: PropTypes.func.isRequired,
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

export default PrimaryActionButton;
