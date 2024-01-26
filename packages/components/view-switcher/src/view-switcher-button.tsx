import {
  cloneElement,
  type MouseEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { warning } from '@commercetools-uikit/utils';
import { getButtonStyles } from './view-switcher.styles';

export type TViewSwitcherButtonProps = {
  children?: string;
  icon?: ReactElement;
  isActive?: boolean;
  isDisabled?: boolean;
  isCondensed?: boolean;
  isFirstButton?: boolean;
  isLastButton?: boolean;
  label?: string;
  value: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const ViewSwitcherButton = (props: TViewSwitcherButtonProps) => {
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

ViewSwitcherButton.displayName = 'ViewSwitcherButton';
export default ViewSwitcherButton;
