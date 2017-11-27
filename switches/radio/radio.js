import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import classnames from 'classnames';
import Text from '../../typography/text';
import styles from './radio.mod.css';

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
}

export const Option = props => (
  <AccessibleButton
    label={props.children}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    className={classnames(styles.optionWrapper, {
      [styles.disabledOption]: props.isDisabled,
    })}
  >
    {props.children}
  </AccessibleButton>
);
Option.displayName = 'RadioOption';
Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  iconLeft: PropTypes.node.isRequired,
};
Option.defaultProps = {
  isDisabled: false,
};

export default { Group, Option };
