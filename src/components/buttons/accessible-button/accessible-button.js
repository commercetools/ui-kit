import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { oneLine } from 'common-tags';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const propsToOmit = ['onClick'];

const Button = styled.button`
  text-decoration: none;
  border: none;
  background: none;
  box-sizing: border-box;
  display: inline-flex;
  outline: 0;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: inherit;
  font: inherit;
  font-size: ${vars.fontSizeDefault};
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
  }
`;

const AccessibleButton = React.forwardRef((props, ref) => {
  const { onClick } = props;

  const handleClick = React.useCallback(
    event => {
      if (props.isDisabled) {
        event.preventDefault();
        return false;
      }
      if (!props.isDisabled && onClick) return onClick(event);
      // eslint-disable-next-line no-useless-return, consistent-return
      return;
    },
    [onClick, props.isDisabled]
  );

  const isButton = !props.as || props.as === 'button';

  const buttonProps = {
    type: props.type,
  };

  return (
    <Button
      as={props.as}
      id={props.id}
      ref={ref}
      aria-label={props.label}
      onClick={handleClick}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      disabled={props.isDisabled}
      aria-disabled={props.isDisabled}
      {...(props.isToggleButton ? { 'aria-pressed': props.isToggled } : {})}
      {...omit(props.buttonAttributes, propsToOmit)}
      {...(isButton ? buttonProps : {})}
    >
      {props.children}
    </Button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';
AccessibleButton.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  id: PropTypes.string,
  type: (props, propName, componentName, ...rest) => {
    // the type defaults to `button`, so we don't need to handle undefined
    if (props.as && props.type !== 'button') {
      throw new Error(
        oneLine`
          ${componentName}: "${propName}" does not have any effect when
          "as" is set.
        `
      );
    }
    return PropTypes.oneOf(['submit', 'reset', 'button'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },
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
  isToggleButton: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  // allows setting custom attributes on the underlying button html element
  buttonAttributes: PropTypes.object,
};
AccessibleButton.defaultProps = {
  type: 'button',
  buttonAttributes: {},
  isToggleButton: false,
  isToggled: false,
};

export default AccessibleButton;
