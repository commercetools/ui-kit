import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '../../../materials/spacings';
import styles from './base-button-wrapper.mod.css';

// This holds the logic of the `button` element, which wraps a `span` (defined as `BaseButtonContent`) with styles
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
    isToggled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
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
        aria-pressed={this.props.isToggled}
        {...this.props.dataAttr}
      >
        {this.props.children}
      </button>
    );
  }
}

export default BaseButtonWrapper;

// This holds the styles of the button, which is wrapped by a `button` (defined as `BaseButtonWrappr`) with the `button` element logic
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
  styles: PropTypes.string,
};
