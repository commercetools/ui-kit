import React, {
  useCallback,
  useEffect,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useToggleState } from '@commercetools-uikit/hooks';
import { type TMaxProp } from '@commercetools-uikit/constraints';
import styled from '@emotion/styled';
import DropdownMenuContext from './context';
import DropdownTrigger from './trigger';
import {
  DropdownContentMenu,
  DropdownListMenu,
  DropdownListMenuItem,
} from './menu';

export type TDropdownMenuProps = {
  /**
   * The position of the menu relative to the trigger element.
   */
  menuPosition?: 'left' | 'right';
  /**
   * The element that triggers the dropdown.
   */
  triggerElement: ReactElement;
  /**
   * The type of the menu.
   * The 'default' type just renders a dropdown container but the 'list' type is intended to be used with the DropdownMenu.ListMenuItem component.
   */
  menuType?: 'default' | 'list';
  /**
   * The horizontal constraint of the menu.
   */
  menuHorizontalConstraint?: TMaxProp;
  /**
   * The content of the dropdown.
   */
  children: ReactNode;
};

const defaultProps: Pick<
  TDropdownMenuProps,
  'menuPosition' | 'menuType' | 'menuHorizontalConstraint'
> = {
  menuHorizontalConstraint: 'auto',
  menuPosition: 'left',
  menuType: 'default',
};

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

function DropdownMenu(props: TDropdownMenuProps) {
  const [isOpen, toggle] = useToggleState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  // We use the context so children can toggle the dropdown
  const context = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen, toggle]
  );
  const Menu =
    props.menuType === 'default' ? DropdownContentMenu : DropdownListMenu;

  // Close the dropdown when clicking outside of it
  const handleGlobalClick = useCallback(
    (event) => {
      const triggerElement = triggerRef.current;
      if (
        isOpen &&
        triggerElement &&
        event.target !== triggerElement &&
        window.document.contains(event.target) &&
        !triggerElement.parentElement?.contains(event.target)
      ) {
        toggle(false);
      }
    },
    [triggerRef, toggle, isOpen]
  );
  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);
  // Block scrolling when the dropdown is open
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'initial';
    }
    return () => {
      window.document.body.style.overflow = 'initial';
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={context}>
      <Container>
        <DropdownTrigger onClick={toggle} ref={triggerRef}>
          {props.triggerElement}
        </DropdownTrigger>

        <Menu
          horizontalConstraint={props.menuHorizontalConstraint!}
          isOpen={isOpen}
          menuPosition={props.menuPosition!}
          triggerElementRef={triggerRef}
        >
          {props.children}
        </Menu>
      </Container>
    </DropdownMenuContext.Provider>
  );
}
DropdownMenu.defaultProps = defaultProps;

DropdownMenu.ListMenuItem = DropdownListMenuItem;

export default DropdownMenu;
