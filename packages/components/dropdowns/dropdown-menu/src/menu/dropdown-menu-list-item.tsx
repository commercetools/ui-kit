import { css } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens } from '@commercetools-uikit/design-system';
import { useDropdownMenuContext } from '../context/dropdown-menu-context';
import { filterDataAttributes } from '@commercetools-uikit/utils';

function getDropdownListMenuItemStyles(props: TDropdownListMenuItemProps) {
  return [
    css`
      display: block;
      text-align: left;
      text-wrap: wrap;
      width: 100%;
      padding: ${designTokens.spacing20} ${designTokens.spacing30};
      background-color: ${designTokens.colorSurface};
      &:first-of-type {
        border-radius: ${designTokens.borderRadius6}
          ${designTokens.borderRadius6} 0 0;
      }
      &:last-of-type {
        border-radius: 0 0 ${designTokens.borderRadius6}
          ${designTokens.borderRadius6};
      }
      &:hover {
        background-color: ${designTokens.colorPrimary98};
      }
    `,
    props.isDisabled &&
      css`
        color: ${designTokens.colorNeutral};
      `,
  ];
}

export type TDropdownListMenuItemProps = {
  onClick?: () => void;
  isDisabled?: boolean;
  children: string;
};

function DropdownListMenuItem(props: TDropdownListMenuItemProps) {
  const { toggle } = useDropdownMenuContext();
  return (
    <AccessibleButton
      label={props.children}
      onClick={() => {
        toggle();
        props.onClick?.();
      }}
      isDisabled={props.isDisabled}
      css={getDropdownListMenuItemStyles(props)}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </AccessibleButton>
  );
}

export default DropdownListMenuItem;
