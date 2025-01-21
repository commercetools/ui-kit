import {
  cloneElement,
  type MouseEvent,
  type KeyboardEvent,
  type ReactElement,
  FC,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { warning } from '@commercetools-uikit/utils';
import { getButtonStyles } from './view-switcher.styles';

/**
 * Props for the ViewSwitcherButton component
 */
export type TViewSwitcherButtonProps = {
  /** The text content to be displayed inside the button */
  children?: string;
  /** An icon element to be displayed inside the button */
  icon?: ReactElement;
  /** Indicates if the button is in active state */
  isActive?: boolean;
  /** Indicates if the button is disabled */
  isDisabled?: boolean;
  /** Indicates if the button should be rendered in condensed mode */
  isCondensed?: boolean;
  /** Indicates if this button is the first in a group of buttons */
  isFirstButton?: boolean;
  /** Indicates if this button is the last in a group of buttons */
  isLastButton?: boolean;
  /** Accessible label for the button (required when only icon is provided) */
  label?: string;
  /** Value associated with the button */
  value: string;
  /** Handler called when the button is clicked */
  onClick?: (
    event:
      | MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLButtonElement>
      | string
  ) => void;
};

export type TViewSwitcherButtonElement = FC<TViewSwitcherButtonProps>;

const ViewSwitcherButton: TViewSwitcherButtonElement = (props) => {
  warning(
    Boolean(props.children || props.icon),
    'uikit/ViewSwitcherButton: You need to provide at least the `children` to render inside the button or an `icon`.'
  );

  warning(
    Boolean(props.label || props.children),
    'uikit/ViewSwitcherButton: You need to provide a `label` when rendering only an `icon` within the button.'
  );

  return (
    <AccessibleButton
      label={props.label ?? props.children ?? ''}
      css={getButtonStyles(
        props.isDisabled,
        props.isActive,
        props.isCondensed,
        props.isFirstButton,
        props.isLastButton
      )}
      onClick={props.onClick}
      isDisabled={props.isDisabled}
    >
      {props.icon && (
        <span
          css={css`
            margin: ${props.children ? `0 ${designTokens.spacing20} 0 0` : '0'};
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {cloneElement(props.icon, {
            size: props.isCondensed ? 'medium' : 'big',
          })}
        </span>
      )}
      {props.children && <span>{props.children}</span>}
    </AccessibleButton>
  );
};

ViewSwitcherButton.displayName = 'ViewSwitcher.Button';
export default ViewSwitcherButton;
