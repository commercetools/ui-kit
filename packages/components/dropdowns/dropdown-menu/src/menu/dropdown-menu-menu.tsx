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

export function getDropdownMenuBaseStyles(params: {
  isOpen: boolean;
  horizontalConstraint: TMaxProp;
}) {
  return css`
    background-color: ${designTokens.colorSurface};
    border: 1px solid ${designTokens.colorSurface};
    border-radius: ${designTokens.borderRadius4};
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
    display: ${params.isOpen ? 'block' : 'none'};
    margin-top: ${designTokens.spacing20};
    max-width: ${Constraints.getMaxPropTokenValue(params.horizontalConstraint)};
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
  triggerElementRef: RefObject<HTMLElement>;
};
function DropdownBaseMenu(props: TDropdownBaseMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Update the position of the menu when it is open
    if (props.isOpen && props.triggerElementRef.current && menuRef.current) {
      const triggerElementCoordinates =
        props.triggerElementRef.current.getBoundingClientRect();
      const menuElementCoordinates = menuRef.current.getBoundingClientRect();

      menuRef.current.style.top = `${
        triggerElementCoordinates.top + triggerElementCoordinates.height
      }px`;
      menuRef.current.style.left =
        props.menuPosition === 'left'
          ? `${triggerElementCoordinates.left}px`
          : `${
              triggerElementCoordinates.left +
              triggerElementCoordinates.width -
              menuElementCoordinates.width
            }px`;
    }
  }, [props.isOpen, props.menuPosition, props.triggerElementRef]);

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
  isOpen: boolean;
  triggerElementRef: RefObject<HTMLElement>;
};
export const DropdownListMenu = (props: TDropdownListMenuProps) => {
  return (
    <DropdownBaseMenu
      horizontalConstraint={props.horizontalConstraint}
      isOpen={props.isOpen}
      menuPosition={props.menuPosition}
      triggerElementRef={props.triggerElementRef}
    >
      <SpacingsStack scale="xs">{props.children}</SpacingsStack>
    </DropdownBaseMenu>
  );
};