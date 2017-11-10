import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Text from '../../typography/text';
import styles from './link-button.mod.css';

const LinkButton = props => (
  <Link
    to={props.to}
    className={classnames(styles.button, {
      [styles.disabled]: props.isDisabled,
    })}
  >
    {Boolean(props.iconLeft) &&
      React.cloneElement(props.iconLeft, {
        size: 'small',
        theme: props.isDisabled ? 'grey' : 'green',
      })}
    <Text.Body>{props.label}</Text.Body>
  </Link>
);

LinkButton.displayName = 'LinkButton';
LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  iconLeft: PropTypes.element,
  isDisabled: PropTypes.bool,
};
LinkButton.defaultProps = {
  isDisabled: false,
};

export default LinkButton;
