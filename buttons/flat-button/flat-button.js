import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pick from 'lodash.pick';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import Text from '../../typography/text';
import AccessibleButton from '../accessible-button';
import TRACKING_ATTRIBUTES from '../tracking-attributes';
import styles from './flat-button.mod.css';

export const FlatButton = props => {
  const dataProps = {
    'data-track-component': 'LinkButton',
    ...pick(props, TRACKING_ATTRIBUTES),
  };

  let iconTheme = 'black';
  if (props.isDisabled) iconTheme = 'grey';
  else if (props.type === 'primary') iconTheme = 'green';
  else if (props.type === 'secondary' && props.isMouseOver)
    iconTheme = 'orange';

  const iconElement =
    props.icon &&
    React.cloneElement(props.icon, {
      size: 'small',
      theme: iconTheme,
    });

  return (
    <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
      <AccessibleButton
        buttonAttributes={dataProps}
        label={props.label}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
        className={classnames(styles.button, styles[props.type], {
          [styles.disabled]: props.isDisabled,
        })}
      >
        {props.iconPosition === 'left' && iconElement}

        <Text.Body>{props.label}</Text.Body>

        {props.iconPosition === 'right' && iconElement}
      </AccessibleButton>
    </div>
  );
};

FlatButton.displayName = 'FlatButton';
FlatButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  isDisabled: PropTypes.bool,

  // HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};
FlatButton.defaultProps = {
  type: 'primary',
  iconPosition: 'left',
  isDisabled: false,
};

export default withMouseOverState(FlatButton);
