import type { KeyboardEvent, ElementType, SyntheticEvent } from 'react';

import React from 'react';
import omit from 'lodash/omit';
import { filterAriaAttributes, invariant } from '@commercetools-uikit/utils';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { normalizedButtonStyles } from './accessible-button.styles';

const propsToOmit = ['onClick'];

const getIsEnterOrSpace = (e: KeyboardEvent): boolean =>
  e.key === ' ' || e.key === 'Enter';

// This needs to be a styled component to be able to use the `as` prop.
const Button = styled.button``;

type TAccessibleButtonProps = {
  // an `ElemenType` to indicate if this is a `submit`, `reset` or `button`.
  // <br /> Derived from `styled.button` (`@emotion`)
  as?: ElementType;
  // a unique `id` assigned on `styled.button`
  id?: string;
  // @deprecated in favor of `as`
  type?: 'submit' | 'reset' | 'button';
  // value of the `aria-label`
  label: string;
  // Content of the button
  children: React.ReactNode;
  // Set to `true` or `false` to indicate this is a toggle button
  isToggleButton?: boolean;
  // Set to `true` or `false` to indicate toggle state.
  // <br/>
  // This prop **is required** if `isToggledButton=true`
  isToggled?: boolean;
  // Set to `true` or `false` to indicate that underlying button html element is disabled.
  // <br />
  // Given that it is **not** disabled, the underlying button html element will handle keyPress on `ENTER` and `SPACE`
  isDisabled?: boolean;
  // `className` assigned on Button
  className?: string;
  // A synthetic `MouseEventHandler`.
  // <br />
  // This handler will be called when Button handles keyPress on `ENTER` and `SPACE` (see `isDisabled`)
  onClick?: (event: SyntheticEvent) => void;
  // allows setting custom attributes on the underlying button html element
  buttonAttributes: any;
};

const defaultProps: Pick<
  TAccessibleButtonProps,
  'type' | 'buttonAttributes' | 'isToggleButton' | 'isToggled'
> = {
  type: 'button',
  buttonAttributes: {},
  isToggleButton: false,
  isToggled: false,
};

const AccessibleButton = React.forwardRef(
  (props: TAccessibleButtonProps, ref) => {
    invariant(
      !(props.as && props.type),
      `AccessibleButton: "type" does not have any effect when "as" is set.`
    );

    const shouldNotWarn = true;
    invariant(
      props.isToggleButton !== undefined
        ? props.isToggled !== undefined
        : shouldNotWarn,
      `\`isToggled\` is a required prop if \`isToggleButton\` is \`true\` on AccessibleButton component`
    );

    const isButton = !props.as || props.as === 'button';
    const handleClick = React.useCallback(
      (event: SyntheticEvent) => {
        if (props.isDisabled) {
          event.preventDefault();
          return false;
        }
        if (!props.isDisabled && props.onClick) {
          return props.onClick(event);
        }
        return;
      },
      [props.onClick, props.isDisabled]
    );

    let buttonProps = {};
    if (isButton) {
      buttonProps = {
        type: props.type,
      };
    } else if (!props.isDisabled) {
      buttonProps = {
        role: 'button',
        tabIndex: '0',
        onKeyPress: (event: KeyboardEvent) => {
          if (getIsEnterOrSpace(event)) {
            handleClick(event);
          }
        },
      };
    }

    return (
      <Button
        as={props.as}
        id={props.id}
        // Type 'ForwardedRef<unknown>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
        // Type 'MutableRefObject<unknown>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
        // @ts-ignore
        ref={ref}
        aria-label={props.label}
        onClick={handleClick}
        css={css`
          ${normalizedButtonStyles}
          display: inline-flex;
          font-size: ${vars.fontSizeDefault};
          cursor: ${props.isDisabled ? 'not-allowed' : 'pointer'};
          &:disabled {
            cursor: not-allowed;
          }
        `}
        // Allow to override the styles by passing a `className` prop.
        // Custom styles can also be passed using the `css` prop from emotion.
        // https://emotion.sh/docs/css-prop#style-precedence
        className={props.className}
        disabled={props.isDisabled}
        aria-disabled={props.isDisabled}
        {...(props.isToggleButton ? { 'aria-pressed': props.isToggled } : {})}
        {...omit(props.buttonAttributes, propsToOmit)}
        {...buttonProps}
        {...filterAriaAttributes(props)}
      >
        {props.children}
      </Button>
    );
  }
);

AccessibleButton.defaultProps = defaultProps;
AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
