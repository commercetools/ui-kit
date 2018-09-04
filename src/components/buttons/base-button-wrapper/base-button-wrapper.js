import React from 'react';
import PropTypes from 'prop-types';
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
    icon: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    size: PropTypes.oneOf(['small', 'big']),
  };

  state = {
    isToggled: false,
  };

  render() {
    return (
      <button
        id={this.props.id}
        data={this.props.dataAttr}
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
      >
        {this.props.children}
      </button>
    );
  }
}

BaseButtonWrapper.defaultProps = {
  type: 'button',
  size: 'big',
};

export default BaseButtonWrapper;
