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
import { filterDataAttributes } from '@commercetools-uikit/utils';

// We declare this style properties here because we need them both for initial component styling
// but also for calculating the default max height of the dropdown menu so we make sure it fits
// within the viewport.
const boxShadowBottomSize = '5px';
const outerMargin = designTokens.spacing20;

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
    visibility: hidden;
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

    const menuMaxHeight = props.menuMaxHeight;
    const menuEl = menuRef.current;
    const menuTriggerEl = props.triggerElementRef.current;

    const menuDOMRect = menuEl.getBoundingClientRect();
    const triggerDOMRect = menuTriggerEl.getBoundingClientRect();

    // By default, the menu is not exceeding the viewport, this can change though
    let menuIsExceedingViewport = false;

    if (menuDOMRect.width >= document.body.scrollWidth) {
      // If the menu width is greater than the body width, we need to set the width of the menu to the body width
      // to prevent the menu from overflowing, this happens usually when the horizontalConstraint is set to 'auto'
      menuEl.style.width = `calc(${document.body.scrollWidth}px - 2 * ${outerMargin})`;
      menuIsExceedingViewport = true;
    }

    // The preferred/ideal height of the menu (which might change later if there is
    // not enough screen estate)
    let desiredMenuHeight = menuMaxHeight || menuDOMRect.height;
    const menuWidth = menuDOMRect.width;

    const availableSpaceTop = triggerDOMRect.top;
    const availableSpaceBottom = window.innerHeight - triggerDOMRect.bottom;

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
      const distanceToRightEdge = window.innerWidth - triggerDOMRect.left;
      menuXPosition = distanceToRightEdge >= menuWidth ? 'left' : 'right';
    }

    if (props.menuPosition === 'right') {
      const distanceToLeftEdge = triggerDOMRect.left + triggerDOMRect.width;
      menuXPosition = distanceToLeftEdge >= menuWidth ? 'right' : 'left';
    }
    // Since scrolling will be disabled by a hook, possibly on the body-element,
    // the available viewport-width might change, thus, the positioning of the
    // menu would be affected, hence we need to get the scroll-width before the
    // menu renders
    const scrollWidthBefore = document.body.scrollWidth;

    // Using setTimeout allows us to get the correct dimensions & positions
    // of the trigger- & menu-element first before doing the calculations for
    // positioning the menu correctly
    setTimeout(() => {
      // If there is a scrollWidthDiff, it means that the width of the
      // viewports has changed due to removed scrollbars, and we need to
      // adjust the position of the menu to be still properly aligned with
      // the trigger
      const scrollWidthDiff =
        (document.body.scrollWidth - scrollWidthBefore) * 0.5;

      if (menuIsExceedingViewport) {
        menuEl.style.left = `calc( ${outerMargin} + ${scrollWidthDiff}px)`;
      } else if (menuXPosition === 'left') {
        menuEl.style.left = `${triggerDOMRect.left + scrollWidthDiff}px`;
        menuEl.style.removeProperty('right');
      } else {
        menuEl.style.right = `${
          window.innerWidth - triggerDOMRect.right - scrollWidthDiff
        }px`;
        menuEl.style.removeProperty('left');
      }

      if (menuYPosition === 'below') {
        menuEl.style.top = `calc(${
          triggerDOMRect.top + triggerDOMRect.height
        }px + ${outerMargin})`;
      } else {
        // Need to re-request getBoundingClientRect() because the menu height
        // might have changed when the dropdown is in 'auto' mode;
        let desiredMenuHeight =
          menuMaxHeight || menuEl.getBoundingClientRect().height;

        menuEl.style.top = `calc(${
          triggerDOMRect.top - desiredMenuHeight
        }px - ${outerMargin})`;
      }

      if (menuMaxHeight) {
        // Apply the manual max-width
        menuEl.style.maxHeight = menuMaxHeight + 'px';
      } else {
        // Make sure max-height does not exceed the available top- or bottom-space
        menuEl.style.maxHeight =
          menuYPosition === 'below'
            ? `calc(${
                window.innerHeight - triggerDOMRect.bottom
              }px - ${outerMargin} - ${boxShadowBottomSize})`
            : `calc(${triggerDOMRect.top}px - ${outerMargin} - ${boxShadowBottomSize})`;
      }

      // All positioning operations done, make menu visible again
      menuEl.style.visibility = 'visible';
    }, 0);

    return () => {
      [
        'top',
        'left',
        'right',
        'bottom',
        'width',
        'height',
        'maxHeight',
        'visibility',
      ].forEach((prop) => {
        menuEl.style.removeProperty(prop);
      });
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
      {...filterDataAttributes(props)}
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
      {...filterDataAttributes(props)}
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
      {...filterDataAttributes(props)}
    >
      <SpacingsStack scale="xs">{props.children}</SpacingsStack>
    </DropdownBaseMenu>
  );
};
