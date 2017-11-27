import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import styles from './radio.mod.css';

const Option = props => (
  <div className={styles.optionsWrapper}>
    <label>
      <Spacings.Inline>
        <input
          className={classnames(styles.inputWrapper, {
            [styles.inputDisabled]: props.isDisabled,
            [styles.inputChecked]: props.isChecked,
          })}
          name={props.name}
          onClick={props.onClick}
          disabled={props.isDisabled}
          checked={props.isChecked}
          type="radio"
        />
        <Text.Detail>{props.children}</Text.Detail>
      </Spacings.Inline>
    </label>
  </div>
);
Option.displayName = 'RadioOption';
Option.propTypes = {
  // Defaulted
  isDisabled: PropTypes.booleean,
  isChecked: PropTypes.booleean,
  // Injected through as compond component
  // not required as `createElement` is used.
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
Option.defaultProps = {
  isChecked: false,
  isDisabled: false,
};

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
    wrapperClassname: PropTypes.string,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    selectedValue: this.props.selectedValue,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue)
      this.setState({
        selectedValue: nextProps.selectedValue,
      });
  }

  handleChange = event => {
    console.log(event);
  };

  render() {
    return (
      <div
        className={classnames(
          this.props.wrapperClassname,
          styles.wrapperClassname
        )}
      >
        {React.Children.map(this.props.children, child => {
          // NOTE:
          //    Allowing to intersperse other elements
          //    than `Option`.
          if (child.type === Option)
            return React.cloneElement(child, {
              isActive: this.state.selectedValue === child.props.value,
              name: this.props.name,
              onClick: this.handleChange,
            });
          return child;
        })}
      </div>
    );
  }
}

export default { Group, Option };
