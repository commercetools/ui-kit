import React, { useMemo, type ReactNode, useContext } from 'react';
import { css, type SerializedStyles } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens } from '@commercetools-uikit/design-system';
import { useToggleState } from '@commercetools-uikit/hooks';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { type TMaxProp } from '@commercetools-uikit/constraints';
import {
  getDropdownListMenuItemStyles,
  getDropdownMenuBaseStyles,
} from './dropdown-menu.styles';

export type TDropdownMenuProps = {
  menuPosition?: 'left' | 'right';
  children: ReactNode;
};

const defaultProps: Pick<TDropdownMenuProps, 'menuPosition'> = {
  menuPosition: 'left',
};

type TDropdownMenuContextProps = {
  isOpen: boolean;
  toggle: () => void;
  menuPosition: 'left' | 'right';
};
const DropdownMenuContext = React.createContext<TDropdownMenuContextProps>({
  isOpen: false,
  toggle: () => {},
  menuPosition: 'left',
});

export function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      '[ui-kit] DropdownMenu context can only be used in DropdownMenu children components.'
    );
  }

  return {
    isOpen: context.isOpen,
    toggle: context.toggle,
  };
}

type TDropdownTriggerProps = {
  onClick?: (toggle: () => void) => void;
  children: ReactNode;
};
function DropDownTrigger(props: TDropdownTriggerProps) {
  const { toggle } = React.useContext(DropdownMenuContext);
  return (
    <div onClick={props.onClick ? props.onClick.bind(null, toggle) : toggle}>
      {props.children}
    </div>
  );
}

type TDropdownBaseMenuProps = {
  customStyles?: SerializedStyles;
  horizontalConstraint?: TMaxProp;
  children: ReactNode;
};
function DropDownBaseMenu(props: TDropdownBaseMenuProps) {
  const { isOpen, menuPosition } = React.useContext(DropdownMenuContext);

  if (!isOpen) {
    return null;
  }

  return (
    // <Constraints.Horizontal max={props.horizontalConstraint || 'auto'}>
    <div
      css={[getDropdownMenuBaseStyles({ menuPosition }), props.customStyles]}
    >
      {props.children}
    </div>
    // </Constraints.Horizontal>
  );
}

function DropDownContentMenu(props: {
  children: ReactNode;
  horizontalConstraint?: TMaxProp;
}) {
  return (
    <DropDownBaseMenu
      horizontalConstraint={props.horizontalConstraint}
      customStyles={css`
        padding: ${designTokens.spacing30};
      `}
    >
      {props.children}
    </DropDownBaseMenu>
  );
}

function DropDownListMenu(props: {
  children: ReactNode;
  horizontalConstraint?: TMaxProp;
}) {
  return (
    <DropDownBaseMenu horizontalConstraint={props.horizontalConstraint}>
      <SpacingsStack scale="xs">{props.children}</SpacingsStack>
    </DropDownBaseMenu>
  );
}

export type TDropdownListMenuItemProps = {
  onClick: () => void;
  isDisabled?: boolean;
  children: string;
};

function DropdownListMenuItem(props: TDropdownListMenuItemProps) {
  const { toggle } = React.useContext(DropdownMenuContext);
  return (
    <AccessibleButton
      label={props.children}
      onClick={() => {
        toggle();
        props.onClick();
      }}
      isDisabled={props.isDisabled}
      css={getDropdownListMenuItemStyles(props)}
    >
      {props.children}
    </AccessibleButton>
  );
}

function DropdownMenu(props: TDropdownMenuProps) {
  const [isOpen, toggle] = useToggleState(false);
  const context = useMemo(
    () => ({
      isOpen,
      toggle,
      menuPosition: props.menuPosition!,
    }),
    [isOpen, toggle, props.menuPosition]
  );

  return (
    <DropdownMenuContext.Provider value={context}>
      <div style={{ display: 'inline-block', position: 'relative' }}>
        {props.children}
      </div>
    </DropdownMenuContext.Provider>
  );
}
DropdownMenu.defaultProps = defaultProps;

DropdownMenu.Trigger = DropDownTrigger;
DropdownMenu.ContentMenu = DropDownContentMenu;
DropdownMenu.ListMenu = DropDownListMenu;
DropdownMenu.ListMenuItem = DropdownListMenuItem;

export default DropdownMenu;
