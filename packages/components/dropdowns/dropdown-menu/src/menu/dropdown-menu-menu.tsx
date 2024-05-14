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
    margin-top: ${marginTop};
    max-width: ${Constraints.getMaxPropTokenValue(params.horizontalConstraint)};
    overflow-y: auto;
    position: fixed;
    width: ${params.horizontalConstraint === 'auto' ? 'auto' : '100%'};
    z-index: 5;
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
    // Update the position of the menu when it is open
    if (props.isOpen && props.triggerElementRef.current && menuRef.current) {
      const triggerElementCoordinates =
        props.triggerElementRef.current.getBoundingClientRect();

      menuRef.current.style.top = `${
        triggerElementCoordinates.top + triggerElementCoordinates.height
      }px`;
      if (props.menuPosition === 'left') {
        menuRef.current.style.left = `${triggerElementCoordinates.left}px`;
        menuRef.current.style.removeProperty('right');
      } else {
        menuRef.current.style.right = `${
          window.innerWidth - triggerElementCoordinates.right
        }px`;
        menuRef.current.style.removeProperty('left');
      }
      menuRef.current.style.maxHeight = props.menuMaxHeight
        ? `${props.menuMaxHeight}px`
        : `calc(${
            window.innerHeight -
            (triggerElementCoordinates.top + triggerElementCoordinates.height)
          }px - ${marginTop} - ${boxShadowBottomSize})`;
    }
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
