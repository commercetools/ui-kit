import {
  forwardRef,
  useCallback,
  ReactNode,
  KeyboardEvent,
  ElementType,
  ComponentType,
  MouseEventHandler,
  KeyboardEventHandler,
  MouseEvent,
} from 'react';
import { isValidElementType } from 'react-is';
import omit from 'lodash/omit';
import {
  filterAriaAttributes,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { normalizedButtonStyles } from './accessible-button.styles';

const propsToOmit = ['onClick'];

const getIsEnterOrSpace = (event: KeyboardEvent<HTMLButtonElement>): boolean =>
  event.key === ' ' || event.key === 'Enter';

// This needs to be a styled component to be able to use the `as` prop.
const Button = styled.button``;

export type TAccessibleButtonProps = {
  /**
   * By default the component renders a `button` element. You can pass an optional `React.ElemenType`
   * in case this needs to be rendered as a different element.
   */
  as?: string | ComponentType;
  /**
   * The ID of the element.
   */
  id?: string;
  //
  /**
   * The [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) of the `button` element.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * The aria-label value.
   */
  label: string;
  /**
   * Any React node.
   */
  children: ReactNode;
  /**
   * If `true`, indicates that this is a toggle button.
   */
  isToggleButton?: boolean;
  /**
   * If `true`, indicates that this element is in a toggled state.
   * <br/>
   * This prop is only used if `isToggleButton` is `true`.
   */
  isToggled?: boolean;
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled?: boolean;
  /**
   * Allow to override the styles by passing a `className` prop.
   * <br/>
   * Custom styles can also be passed using the [`css` prop from emotion](https://emotion.sh/docs/css-prop#style-precedence).
   */
  className?: string;
  /**
   * Event handler when the button is clicked, or the user presses `ENTER` or `SPACE`.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Any HTML attributes to be forwarded to the HTML element.
   */
  buttonAttributes?: Record<string, unknown>;
};

const AccessibleButton = forwardRef<HTMLButtonElement, TAccessibleButtonProps>(
  (
    {
      type = 'button',
      buttonAttributes = {},
      isToggleButton = false,
      isToggled = false,
      ...props
    }: TAccessibleButtonProps,
    ref
  ) => {
    warning(
      props.as ? isValidElementType(props.as) : true,
      `ui-kit/AccessibleButton: "as" must be a valid element type.`
    );

    warning(
      !(props.as && type !== 'button'),
      `ui-kit/AccessibleButton: "type" does not have any effect when "as" is set.`
    );

    warning(
      !(isToggleButton && isToggled === undefined),
      `ui-kit/AccessibleButton: "isToggled" is required if "isToggleButton" is "true"`
    );

    const isButton = !props.as || props.as === 'button';

    const { onClick } = props;
    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        if (props.isDisabled) {
          event.preventDefault();
          return false;
        }
        if (!props.isDisabled && onClick) {
          return onClick(event);
        }
        return;
      },
      [onClick, props.isDisabled]
    );
    const handleKeyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
      (event) => {
        if (props.isDisabled) {
          event.preventDefault();
          return false;
        }
        if (!props.isDisabled && onClick && getIsEnterOrSpace(event)) {
          return onClick(event);
        }
        return;
      },
      [onClick, props.isDisabled]
    );

    let buttonProps = {};
    if (isButton) {
      buttonProps = {
        type,
      };
    } else {
      buttonProps = {
        role: 'button',
        tabIndex: '0',
        onKeyPress: handleKeyPress,
      };
    }

    return (
      <Button
        as={props.as as ElementType}
        id={props.id}
        ref={ref}
        aria-label={props.label}
        onClick={handleClick}
        css={css`
          ${normalizedButtonStyles}
          display: inline-flex;
          font-size: ${designTokens.fontSize20};
          font-weight: ${designTokens.fontWeight500};
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
        {...(isToggleButton ? { 'aria-pressed': isToggled } : {})}
        {...omit(buttonAttributes, propsToOmit)}
        {...buttonProps}
        {...filterAriaAttributes(props)}
        {...filterDataAttributes(props)}
      >
        {props.children}
      </Button>
    );
  }
);
AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
