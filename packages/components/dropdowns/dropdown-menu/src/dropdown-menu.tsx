import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
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
   * The maximum height for the menu in pixels.
   * By default, the max height will be the available space between the trigger element and the bottom of the viewport.
   */
  menuMaxHeight?: number;
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

function getScrollableParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) {
    return null;
  }
  const overflowY = window.getComputedStyle(element).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
  if (isScrollable && element.scrollHeight >= element.clientHeight) {
    return element;
  }

  return getScrollableParent(element.parentElement);
}

function useScrollBlock(
  isOpen: boolean,
  triggerRef: RefObject<HTMLElement | null>
) {
  const scrollableParentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!scrollableParentRef.current) {
      scrollableParentRef.current = getScrollableParent(triggerRef.current);
    }

    const { current: scrollableParent } = scrollableParentRef;
    if (scrollableParent && isOpen) {
      scrollableParent.setAttribute(
        'data-prev-scroll',
        scrollableParent.style.overflowY
      );
      scrollableParent.style.overflowY = 'hidden';
    }
    return () => {
      // The cleanup effect runs after the component is unmounted but also everytime
      // the dependency array changes. We need to manage both to manage opening/closing
      // the dropdown but also to manage the the dropdown is opened and the component
      // is unmounted. For instance, when navigating to another page client-side.
      if (scrollableParent && isOpen) {
        const prevScroll = scrollableParent.getAttribute('data-prev-scroll');
        scrollableParent.style.overflowY = prevScroll || '';
      }
    };
  }, [isOpen, scrollableParentRef, triggerRef]);
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

function DropdownMenu({
  menuHorizontalConstraint = 'auto',
  menuPosition = 'left',
  menuType = 'default',
  ...props
}: TDropdownMenuProps) {
  const [isOpen, toggle] = useToggleState(false);
  const triggerRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  // We use the context so children can toggle the dropdown
  const context = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen, toggle]
  );
  const Menu = menuType === 'default' ? DropdownContentMenu : DropdownListMenu;

  // Close the dropdown when clicking outside of it
  const handleGlobalClick: EventListener = useCallback(
    (event: Event) => {
      const triggerElement = triggerRef.current;
      if (
        isOpen &&
        triggerElement &&
        event.target !== triggerElement &&
        window.document.contains(event.target as Node) &&
        !triggerElement.parentElement?.contains(event.target as Node)
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

  // Block scrolling when the dropdown is open.
  // We do this to avoid requiring dropdown rerendering while the user scrolls.
  useScrollBlock(isOpen, triggerRef);

  return (
    <DropdownMenuContext.Provider value={context}>
      <Container>
        <DropdownTrigger onClick={toggle} ref={triggerRef}>
          {props.triggerElement}
        </DropdownTrigger>

        <Menu
          horizontalConstraint={menuHorizontalConstraint!}
          isOpen={isOpen}
          menuPosition={menuPosition!}
          menuMaxHeight={props.menuMaxHeight}
          triggerElementRef={triggerRef}
          {...filterDataAttributes({
            menuHorizontalConstraint,
            menuPosition,
            menuType,
            ...props,
          })}
        >
          {props.children}
        </Menu>
      </Container>
    </DropdownMenuContext.Provider>
  );
}

DropdownMenu.ListMenuItem = DropdownListMenuItem;

export default DropdownMenu;
