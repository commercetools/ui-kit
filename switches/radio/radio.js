import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import styles from './radio.mod.css';

class Option extends React.PureComponent {
  static displayName = 'RadioOption';
  static propTypes = {
    isDisabled: PropTypes.boolean,
    value: PropTypes.PropTypes.isRequired,
    children: PropTypes.string,
    // Injected through as compound component
    // not required as `createElement` is used.
    isChecked: PropTypes.boolean,
    name: PropTypes.string,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    isChecked: false,
    isDisabled: false,
  };

  handleChange = () => this.props.onClick(this.props.value);

  render() {
    return (
      <div className={styles.optionsWrapper}>
        <label>
          <Spacings.Inline>
            <input
              className={classnames(styles.inputWrapper, {
                [styles.inputDisabled]: this.props.isDisabled,
                [styles.inputChecked]: this.props.isChecked,
              })}
              name={this.props.name}
              value={this.props.value}
              onClick={this.handleChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked}
              type="radio"
            />
            {this.props.children && (
              <Text.Detail>{this.props.children}</Text.Detail>
            )}
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(['stack', 'inline']),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    direction: 'stack',
  };

  state = {
    value: this.props.value,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value)
      this.handleChange(nextProps.value);
  }

  handleChange = nextValue =>
    this.setState({
      value: nextValue,
    });

  render() {
    const DirectionWrapper =
      this.props.direction === 'stack' ? Spacings.Stack : Spacings.Inline;
    return (
      <div
        className={classnames(this.props.className, styles.wrapperClassname)}
      >
        <DirectionWrapper>
          {React.Children.map(this.props.children, child => {
            // NOTE:
            //    Allowing to intersperse other elements
            //    than `Option`.
            if (child.type === Option)
              return React.cloneElement(child, {
                key: child.props.value,
                isChecked: this.state.value === child.props.value,
                name: this.props.name,
                onClick: this.handleChange,
              });
            return child;
          })}
        </DirectionWrapper>
      </div>
    );
  }
}

export default { Group, Option };
