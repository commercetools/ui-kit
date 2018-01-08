import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import Icons from './icons';
import styles from './checkbox.mod.css';

export class Checkbox extends React.PureComponent {
  static displayName = 'Checkbox';
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    // HoC
    isMouseOver: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isDisabled: false,
    isChecked: false,
  };

  render() {
    return (
      <div
        onMouseOver={this.props.handleMouseOver}
        onMouseOut={this.props.handleMouseOut}
      >
        <label
          className={classnames(styles.labelWrapper, {
            [styles.labelWrapperDisabled]: this.props.isDisabled,
          })}
        >
          <Spacings.Inline alignItems="center">
            {(() => {
              if (this.props.isChecked && this.props.isDisabled)
                return <Icons.CheckedDisabled />;
              else if (this.props.isChecked && this.props.isMouseOver)
                return <Icons.CheckedHover />;
              else if (this.props.isChecked) return <Icons.Checked />;
              else if (this.props.isDisabled) return <Icons.Disabled />;
              else if (this.props.isMouseOver) return <Icons.Hover />;

              return <Icons.Default />;
            })()}
            {this.props.children && (
              <span
                className={classnames({
                  [styles.textWrapperDisabled]: this.props.isDisabled,
                })}
              >
                {this.props.children}
              </span>
            )}
            <input
              className={styles.inputWrapper}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked}
              type="checkbox"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default withMouseOverState(Checkbox);
