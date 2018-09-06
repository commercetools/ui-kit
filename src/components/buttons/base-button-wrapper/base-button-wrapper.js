import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '../../../materials/spacings';
import styles from './base-button-wrapper.mod.css';

class BaseButtonWrapper extends React.Component {
  static displayName = 'BaseButtonWrapper';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    ref: PropTypes.string,
    children: PropTypes.node,
    ariaLabel: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
    isDisabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
  };

  state = {
    isToggled: false,
  };

  render() {
    return (
      <button
        id={this.props.id}
        name={this.props.name}
        disabled={this.props.isDisabled}
        onClick={this.props.onClick}
        type={this.props.type}
        ref={this.props.ref}
        className={styles.reset}
        // Accessibility
        role="button"
        aria-label={this.props.ariaLabel}
        aria-pressed={this.state.isToggled}
        {...this.props.dataAttr}
      >
        {this.props.children}
      </button>
    );
  }
}

export default BaseButtonWrapper;

export const BaseButtonContent = props => (
  <span className={props.styles}>
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

BaseButtonContent.propTypes = {
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  isToggled: PropTypes.bool,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['small', 'big']),
  styles: PropTypes.array,
};
