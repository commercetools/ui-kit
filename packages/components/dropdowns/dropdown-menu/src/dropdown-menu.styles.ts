import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type {
  TDropdownMenuProps,
  TDropdownListMenuItemProps,
} from './dropdown-menu';

export function getDropdownMenuBaseStyles(
  props: Pick<TDropdownMenuProps, 'menuPosition'>
) {
  return css`
    border: 1px solid ${designTokens.colorSurface};
    border-radius: ${designTokens.borderRadius4};
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.15);
    margin-top: ${designTokens.spacing20};
    position: absolute;
    z-index: 5;
    ${props.menuPosition === 'right' ? 'right' : 'left'}: 0;
  `;
}

export function getDropdownListMenuItemStyles(
  props: TDropdownListMenuItemProps
) {
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
        background-color: ${designTokens.colorNeutral95};
      }
    `,
    props.isDisabled &&
      css`
        color: ${designTokens.colorNeutral};
      `,
  ];
}
