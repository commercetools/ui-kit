import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

/*
  Even though this button could be a functional component a class is used to
  support keeping a reference on the button for components using it.
  React does not support this for functional components:
    https://github.com/facebook/react/issues/4936
 */
export default class AccessibleButton extends React.PureComponent {
  static displayName = 'AccessibleButton';
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    // set to true or false to indicate a toggle button
    isToggled: ({ isToggleButton, isToggled }, ...rest) => {
      if (isToggleButton && isToggled === undefined)
        return new Error(
          `\`isToggled\` is a required prop if \`isToggleButton\` is \`true\` on AccessibleButton component`
        );
      return PropTypes.bool({ isToggled }, ...rest);
    },
    buttonRef: PropTypes.func,
    isToggleButton: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    // allows setting custom attributes on the underlying button html element
    buttonAttributes: PropTypes.object,
  };

  static defaultProps = {
    isToggleButton: false,
    buttonAttributes: {},
    type: 'button',
  };

  render() {
    const propsForToggle = this.props.isToggleButton
      ? { 'aria-pressed': this.props.isToggled }
      : {};

    const propsForDisabled = this.props.isDisabled
      ? {
          'aria-disabled': this.props.isDisabled,
          disabled: this.props.isDisabled,
        }
      : {};

    return (
      <button
        id={this.props.id}
        ref={this.props.buttonRef}
        type={this.props.type}
        aria-label={this.props.label}
        onClick={this.props.onClick}
        css={css`
          border: none;
          background: none;
          display: inline-block;
          outline: 0;
          padding: 0;
          margin: 0;
          white-space: nowrap;
          cursor: pointer;
          color: inherit;
          font: inherit;
          font-size: ${vars['--font-size-default']};
          font-family: ${vars['--font-family-default']};

          ${this.props.isDisabled ? 'cursor: not-allowed;' : ''}
        `}
        // Allow to override the styles by passing a `className` prop.
        // Custom styles can also be passed using the `css` prop from emotion.
        // https://emotion.sh/docs/css-prop#style-precedence
        className={this.props.className}
        {...propsForToggle}
        {...propsForDisabled}
        {...this.props.buttonAttributes}
      >
        {this.props.children}
      </button>
    );
  }
}
