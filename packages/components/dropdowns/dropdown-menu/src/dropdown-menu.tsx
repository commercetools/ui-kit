import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens } from '@commercetools-uikit/design-system';
import { useToggleState } from '@commercetools-uikit/hooks';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Constraints, { type TMaxProp } from '@commercetools-uikit/constraints';
import {
  getDropdownListMenuItemStyles,
  getDropdownMenuBaseStyles,
} from './dropdown-menu.styles';

export type TDropdownMenuProps = {
  menuPosition?: 'left' | 'right';
  triggerElement: ReactElement;
  menuType: 'default' | 'default';
  menuHorizontalConstraint?: TMaxProp;
  children: ReactNode;
};

const defaultProps: Pick<
  TDropdownMenuProps,
  'menuPosition' | 'menuHorizontalConstraint'
> = {
  menuPosition: 'left',
  menuHorizontalConstraint: 'auto',
};

type TDropdownMenuContextProps = {
  isOpen: boolean;
  toggle: () => void;
};
const DropdownMenuContext = React.createContext<TDropdownMenuContextProps>({
  isOpen: false,
  toggle: () => {},
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
  onClick?: () => void;
  children: ReactNode;
};
const DropDownTrigger = forwardRef<HTMLDivElement, TDropdownTriggerProps>(
  (props, ref) => {
    return (
      <div onClick={props.onClick} ref={ref}>
        {props.children}
      </div>
    );
  }
);
DropDownTrigger.displayName = 'DropDownTrigger';

type TDropdownBaseMenuProps = {
  children: ReactNode;
  customStyles?: CSSProperties;
  horizontalConstraint?: TMaxProp;
  menuPosition: 'left' | 'right';
};
function DropDownBaseMenu(props: TDropdownBaseMenuProps) {
  return (
    <Constraints.Horizontal max={props.horizontalConstraint || 'auto'}>
      <div css={getDropdownMenuBaseStyles()} style={props.customStyles}>
        {props.children}
      </div>
    </Constraints.Horizontal>
  );
}

type TDropDownContentMenuProps = {
  children: ReactNode;
  customStyles?: CSSProperties;
  horizontalConstraint?: TMaxProp;
  menuPosition: 'left' | 'right';
};
function DropDownContentMenu(props: TDropDownContentMenuProps) {
  return (
    <DropDownBaseMenu
      customStyles={{
        padding: designTokens.spacing30,
        ...props.customStyles,
      }}
      horizontalConstraint={props.horizontalConstraint}
      menuPosition={props.menuPosition}
    >
      {props.children}
    </DropDownBaseMenu>
  );
}

type TDropDownListMenuProps = {
  children: ReactNode;
  customStyles?: CSSProperties;
  horizontalConstraint?: TMaxProp;
  menuPosition: 'left' | 'right';
};
function DropDownListMenu(props: TDropDownListMenuProps) {
  return (
    <DropDownBaseMenu
      horizontalConstraint={props.horizontalConstraint}
      menuPosition={props.menuPosition}
      customStyles={props.customStyles}
    >
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
  const { toggle } = useContext(DropdownMenuContext);
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

const calculateMenuPositionStyles = (
  triggerElement: HTMLElement,
  menuPosition: 'left' | 'right'
): CSSProperties => {
  const triggerElementCoordinates = triggerElement.getBoundingClientRect();
  return {
    top: `${
      triggerElementCoordinates.top + triggerElementCoordinates.height
    }px`,
    ...(menuPosition === 'left'
      ? { left: `${triggerElementCoordinates.left}px` }
      : { right: `${triggerElementCoordinates.x}px` }),
  };
};

function DropdownMenu(props: TDropdownMenuProps) {
  const [isOpen, toggle] = useToggleState(false);
  const [menuCustomStyles, setMenuCustomStyles] = React.useState<CSSProperties>(
    {}
  );
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const toggleHandler = useCallback(() => {
    setMenuCustomStyles(
      calculateMenuPositionStyles(triggerRef.current!, props.menuPosition!)
    );
    toggle();
  }, [toggle, props.menuPosition]);
  const context = useMemo(
    () => ({
      isOpen,
      toggle: toggleHandler,
    }),
    [isOpen, toggleHandler]
  );
  const Menu =
    props.menuType === 'default' ? DropDownContentMenu : DropDownListMenu;

  // TODO: block scroll and window click handler to close the dropdown
  useEffect(() => {}, []);

  return (
    <DropdownMenuContext.Provider value={context}>
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <DropDownTrigger onClick={toggleHandler} ref={triggerRef}>
          {props.triggerElement}
        </DropDownTrigger>
        {isOpen && (
          <Menu
            customStyles={menuCustomStyles}
            horizontalConstraint={props.menuHorizontalConstraint}
            menuPosition={props.menuPosition!}
          >
            {props.children}
          </Menu>
        )}
      </div>
    </DropdownMenuContext.Provider>
  );
}
DropdownMenu.defaultProps = defaultProps;

DropdownMenu.ListMenuItem = DropdownListMenuItem;

export default DropdownMenu;
