import {
  cloneElement,
  type MouseEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { css } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens } from '@commercetools-uikit/design-system';
import { getButtonStyles } from './view-switcher.styles';

export type TViewSwitcherButtonProps = {
  isDisabled?: boolean;
  isActive?: boolean;
  children: string;
  isCondensed?: boolean;
  isFirstButton?: boolean;
  isLastButton?: boolean;
  icon?: ReactElement;
  value: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const ViewSwitcherButton = (props: TViewSwitcherButtonProps) => (
  <AccessibleButton
    label={props.children}
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
          margin: ${designTokens.marginForViewSwitcherIcon};
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
    <span>{props.children}</span>
  </AccessibleButton>
);

ViewSwitcherButton.displayName = 'ViewSwitcherButton';
export default ViewSwitcherButton;
