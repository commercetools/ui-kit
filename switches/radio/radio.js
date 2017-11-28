import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import Icons from './icons';
import styles from './radio.mod.css';

class Option extends React.PureComponent {
  static displayName = 'RadioOption';
  static propTypes = {
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    children: PropTypes.string,
    // Injected through as compound component
    // not required as `createElement` is used.
    name: PropTypes.string,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    isDisabled: false,
  };

  handleChange = () => this.props.onClick(this.props.value);

  render() {
    return (
      <div className={styles.optionsWrapper}>
        <label>
          <Spacings.Inline>
            <input
              className={styles.inputWrapper}
              name={this.props.name}
              value={this.props.value}
              onClick={this.handleChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked}
              type="radio"
            />
            {(() => {
              if (this.props.isChecked && this.props.isDisabled)
                return <Icons.CheckedDisabled />;
              else if (this.props.isChecked) return <Icons.Checked />;
              else if (this.props.isDisabled) return <Icons.Disabled />;

              return <Icons.Default />;
            })()}
            {this.props.children && (
              <span
                className={classnames(styles.option, {
                  [styles.optionDisabled]: this.props.isDisabled,
                })}
              >
                {this.props.children}
              </span>
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
    direction: PropTypes.oneOf(['stack', 'inline']),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    direction: 'stack',
  };

  componentWillMount() {
    // NOTE: We allow mixed children rendered as (e.g. spacers)
    // as a result we need to filter out children of the correct type.
    const childrenAsArray = React.Children.toArray(this.props.children);
    const optionChildrenAsArray = childrenAsArray.filter(
      child => child.type === Option
    );

    invariant(
      optionChildrenAsArray.length > 0,
      '@commercetools-local/ui-kit/switches/radio: must contain at least one Radio.Option'
    );
  }

  handleChange = nextValue => this.props.onChange(nextValue);

  render() {
    const DirectionWrapper =
      this.props.direction === 'stack' ? Spacings.Stack : Spacings.Inline;
    return (
      <div className={this.props.className}>
        <DirectionWrapper>
          {React.Children.map(this.props.children, child => {
            // NOTE: Allowing to intersperse other elements than `Option`.
            if (child.type === Option)
              return React.cloneElement(child, {
                isChecked: this.props.value === child.props.value,
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
