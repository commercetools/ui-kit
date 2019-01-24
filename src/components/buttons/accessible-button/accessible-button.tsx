import React from 'react';
import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

type AccessibleButtonProps = {
  id?: string;
  type?: 'submit' | 'reset' | 'button';
  label: string;
  children: React.ReactNode;
  isToggleButton?: boolean;
  isToggled?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
  className?: string;
  buttonAttributes?: Object;
};

type ButtonRef = HTMLButtonElement;

const AccessibleButton: React.FC<AccessibleButtonProps> = React.forwardRef<
  ButtonRef,
  AccessibleButtonProps
>((props, ref) => {
  invariant(
    props.isToggleButton && typeof props.isToggled === 'undefined',
    'ui-kit/AccessibleButton: when `isToggleButton` is passed `isToggled` is required.'
  );

  return (
    <button
      id={props.id}
      ref={ref}
      type={props.type}
      aria-label={props.label}
      onClick={props.onClick}
      css={[
        css`
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
          font-size: ${vars.fontSizeDefault};
          font-family: ${vars.fontFamilyDefault};
        `,
        props.isDisabled &&
          css`
            cursor: not-allowed;
          `,
      ]}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      disabled={props.isDisabled}
      aria-disabled={props.isDisabled}
      {...(props.isToggleButton ? { 'aria-pressed': props.isToggled } : {})}
      {...props.buttonAttributes}
    >
      {props.children}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

AccessibleButton.defaultProps = {
  type: 'button',
  buttonAttributes: {},
  isToggleButton: false,
  isToggled: false,
};

export default AccessibleButton;
