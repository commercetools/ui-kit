import {
  cloneElement,
  type MouseEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { css } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { customProperties } from '@commercetools-uikit/design-system';
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
          margin: 0 ${customProperties.spacingXs} 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {cloneElement(props.icon, {
          color: props.isDisabled ? 'neutral60' : 'colorSolid',
          size: props.isCondensed ? 'medium' : 'big',
        })}
      </span>
    )}
    <span>{props.children}</span>
  </AccessibleButton>
);

ViewSwitcherButton.displayName = 'ViewSwitcherButton';
export default ViewSwitcherButton;
