import {
  CSSProperties,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Constraints, { type TMaxProp } from '@commercetools-uikit/constraints';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

// We declare this style properties here because we need them both for initial component styling
// but also for calculating the default max height of the dropdown menu so we make sure it fits
// within the viewport.
const boxShadowBottomSize = '5px';
const marginTop = designTokens.spacing20;

export function getDropdownMenuBaseStyles(params: {
  isOpen: boolean;
  horizontalConstraint: TMaxProp;
}) {
  return css`
    background-color: ${designTokens.colorSurface};
    border: 1px solid ${designTokens.colorSurface};
    border-radius: ${designTokens.borderRadius4};
    box-shadow: 0 2px ${boxShadowBottomSize} 0px rgba(0, 0, 0, 0.15);
    display: ${params.isOpen ? 'block' : 'none'};
    max-width: ${Constraints.getMaxPropTokenValue(params.horizontalConstraint)};
    overflow-y: auto;
    position: fixed;
    width: ${params.horizontalConstraint === 'auto' ? 'auto' : '100%'};
    z-index: 1;
  `;
}

type TDropdownBaseMenuProps = {
  children: ReactNode;
  customStyles?: CSSProperties;
  horizontalConstraint: TMaxProp;
  isOpen: boolean;
  menuPosition: 'left' | 'right';
  menuMaxHeight?: number;
  triggerElementRef: RefObject<HTMLElement>;
};
function DropdownBaseMenu(props: TDropdownBaseMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!props.isOpen || !props.triggerElementRef.current || !menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    const triggerElementCoordinates =
      props.triggerElementRef.current.getBoundingClientRect();

    const menuClientRect = menuRef.current.getBoundingClientRect();

    let menuIsExceedingViewport = false;

    if (menuClientRect.width >= document.body.scrollWidth) {
      // If the menu width is greater than the body width, we need to set the width of the menu to the body width
      // to prevent the menu from overflowing
      menuRef.current.style.width = `calc(${document.body.scrollWidth}px - 2 * ${marginTop})`;
      menuIsExceedingViewport = true;
    }
    let desiredMenuHeight =
      props.menuMaxHeight && props.menuMaxHeight > 0
        ? props.menuMaxHeight
        : menuClientRect.height;
    const menuWidth = menuClientRect.width;

    const availableSpaceTop = triggerElementCoordinates.top;
    const availableSpaceBottom =
      window.innerHeight - triggerElementCoordinates.bottom;

    // Prefer rendering below the trigger element if there is enough space
    // to display the whole menu, otherwise render wherever there is more space
    const menuYPosition =
      availableSpaceBottom >= desiredMenuHeight
        ? 'below'
        : availableSpaceBottom > availableSpaceTop
        ? 'below'
        : 'above';

    let menuXPosition: 'left' | 'right';

    if (props.menuPosition === 'left') {
      const distanceToRightEdge =
        window.innerWidth - triggerElementCoordinates.left;

      const isEnoughToDisplayMenu = distanceToRightEdge >= menuWidth;

      menuXPosition = isEnoughToDisplayMenu ? 'left' : 'right';
    }
    if (props.menuPosition === 'right') {
      const distanceToLeftEdge =
        triggerElementCoordinates.left + triggerElementCoordinates.width;
      const isEnoughToDisplayMenu = distanceToLeftEdge >= menuWidth;
      menuXPosition = isEnoughToDisplayMenu ? 'right' : 'left';
    }
    // Since the scorlling will be disabled by another hook,
    // the width my change, thus, the positioning of the menu would
    // be affected. We need to get the scroll width before the menu
    const scrollWidthBefore = document.body.scrollWidth;

    // Using setTimeout allows us to get the correct
    // dimensions & positions of the trigger element and the menu first before doing
    // the calculations for positioning the menu correctly
    setTimeout(() => {
      // If there is a scrollWidthDiff, it means that the width of the body has changed
      // due to removed scorllbars and we need to adjust the position of the menu to
      // be still properly aligned with the trigger
      const scrollWidthDiff =
        (document.body.scrollWidth - scrollWidthBefore) * 0.5;

      if (menuIsExceedingViewport) {
        menu.style.left = `calc( ${marginTop} + ${scrollWidthDiff}px)`;
      } else if (menuXPosition === 'left') {
        menu.style.left = `${
          triggerElementCoordinates.left + scrollWidthDiff
        }px`;
        menu.style.removeProperty('right');
      } else {
        menu.style.right = `${
          window.innerWidth - triggerElementCoordinates.right - scrollWidthDiff
        }px`;
        menu.style.removeProperty('left');
      }

      if (menuYPosition === 'below') {
        menu.style.top = `calc(${
          triggerElementCoordinates.top + triggerElementCoordinates.height
        }px + ${marginTop})`;
      } else {
        let desiredMenuHeight =
          props.menuMaxHeight && props.menuMaxHeight > 0
            ? props.menuMaxHeight
            : // Need to re-request getBoundingClientRect() because the menu height
              //might have changed when the dropdown is in 'auto' mode
              menu.getBoundingClientRect().height;

        menu.style.top = `calc(${
          triggerElementCoordinates.top - desiredMenuHeight
        }px - ${marginTop})`;
      }

      if (props.menuMaxHeight && props.menuMaxHeight > 0) {
        // Apply the manual max-width
        menu.style.maxHeight = props.menuMaxHeight + 'px';
      } else {
        // Make sure max-height does not exceed the available top- or bottom-space
        menu.style.maxHeight =
          menuYPosition === 'below'
            ? `calc(${
                window.innerHeight - triggerElementCoordinates.bottom
              }px - ${marginTop} - ${boxShadowBottomSize})`
            : `calc(${triggerElementCoordinates.top}px - ${marginTop} - ${boxShadowBottomSize})`;
      }
    }, 0);

    return () => {
      menu.style.removeProperty('top');
      menu.style.removeProperty('left');
      menu.style.removeProperty('right');
      menu.style.removeProperty('bottom');
      menu.style.removeProperty('width');
      menu.style.removeProperty('height');
      menu.style.removeProperty('outline');
      menu.style.removeProperty('maxHeight');
    };
  }, [
    props.isOpen,
    props.menuPosition,
    props.triggerElementRef,
    props.menuMaxHeight,
  ]);

  return (
    <div
      css={getDropdownMenuBaseStyles(props)}
      style={props.customStyles}
      ref={menuRef}
    >
      {props.children}
    </div>
  );
}

export type TDropdownContentMenuProps = {
  children: ReactNode;
  horizontalConstraint: TMaxProp;
  menuPosition: 'left' | 'right';
  menuMaxHeight?: number;
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLElement>;
};
export const DropdownContentMenu = (props: TDropdownContentMenuProps) => {
  return (
    <DropdownBaseMenu
      customStyles={{
        padding: designTokens.spacing30,
      }}
      horizontalConstraint={props.horizontalConstraint}
      isOpen={props.isOpen}
      menuPosition={props.menuPosition}
      menuMaxHeight={props.menuMaxHeight}
      triggerElementRef={props.triggerElementRef}
    >
      {props.children}
    </DropdownBaseMenu>
  );
};

export type TDropdownListMenuProps = {
  children: ReactNode;
  horizontalConstraint: TMaxProp;
  menuPosition: 'left' | 'right';
  menuMaxHeight?: number;
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLElement>;
};
export const DropdownListMenu = (props: TDropdownListMenuProps) => {
  return (
    <DropdownBaseMenu
      horizontalConstraint={props.horizontalConstraint}
      isOpen={props.isOpen}
      menuPosition={props.menuPosition}
      menuMaxHeight={props.menuMaxHeight}
      triggerElementRef={props.triggerElementRef}
    >
      <SpacingsStack scale="xs">{props.children}</SpacingsStack>
    </DropdownBaseMenu>
  );
};
