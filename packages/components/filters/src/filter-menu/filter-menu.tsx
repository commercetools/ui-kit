import {
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  useRef,
  useCallback,
} from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import * as Popover from '@radix-ui/react-popover';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';

/**
 * CSS selector to find focusable elements.
 * @see https://github.com/microsoft/tabster/blob/6bfd54a45f5b20eccd17b8a05f6c86c241b992c3/src/Focusable.ts#L17-L25
 * TODO: make available as a util for general use
 */
const FOCUSABLE_CSS_SELECTOR = `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), *[tabindex], *[contenteditable]`;

/**
 * Find the first focusable element in the given container,
 * such as the first focusable list item.
 * @param {HTMLElement} container
 * @returns {HTMLElement | null}
 */
function findFirstFocusable<T extends HTMLElement>(container: T): T | null {
  return container.querySelector(FOCUSABLE_CSS_SELECTOR);
}

export type TAppliedFilterValue = {
  value: string;
  label: ReactNode;
};

export type TFilterMenuProps = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * formatted message to display the filter's name
   */
  label: ReactNode;
  /**
   * the input in which the user selects values for the filter
   */
  renderMenuBody: () => ReactNode;
  /**
   * the input in which the user can select which operator should be used for this filter
   */
  renderOperatorsInput?: () => ReactNode;
  /**
   * the values applied to this filter by the user
   */
  appliedFilterValues: TAppliedFilterValue[] | undefined | null;
  /**
   * indicates whether FilterMenu can be removed from the filtersList
   */
  isPersistent?: boolean;
  /**
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * controls whether `x` in Trigger Button is displayed - required if `isPersistent` is `false`
   */
  onRemoveRequest?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * optional button that allows the user to apply selected filter values
   */
  renderApplyButton?: () => ReactNode;
  /**
   * controls whether `clear all` button in Menu Body Footer is displayed
   */
  onClearRequest?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * controls whether `sort` button in Menu Body Header is displayed
   */
  onSortRequest?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * controls whether menu is open on initial render
   */
  defaultOpen?: boolean;
};

export const menuStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing30};
  width: ${designTokens.constraint6};
  padding: ${designTokens.spacing20} ${designTokens.spacing30};
  background-color: ${designTokens.colorSurface};
  border: 1px solid ${designTokens.colorSurface};
  border-radius: ${designTokens.borderRadius8};
  box-shadow: ${designTokens.shadow18};
  animation-duration: ${designTokens.transitionStandard};
  will-change: 'transform, opacity';
  margin-top: ${designTokens.spacing10};
  position: relative;
  z-index: 5;
`;

const menuBodyStyle = css`
  width: 100%;
`;

function FilterMenu(props: TFilterMenuProps) {
  const menuBodyRef = useRef<HTMLDivElement>(null);

  const focusMenuBody = useCallback(
    (e) => {
      if (menuBodyRef.current) {
        const firstFocusableElementInMenuBody = findFirstFocusable(
          menuBodyRef.current
        );
        if (firstFocusableElementInMenuBody) {
          e.preventDefault();
          firstFocusableElementInMenuBody.focus();
        }
      }
    },
    [menuBodyRef]
  );

  return (
    <Popover.Root defaultOpen={props.isDisabled ? false : props.defaultOpen}>
      <Popover.Trigger asChild>
        <TriggerButton
          filterKey={props.filterKey}
          label={props.label}
          appliedFilterValues={props.appliedFilterValues}
          isDisabled={props.isDisabled}
          isPersistent={props.isPersistent}
          onRemoveRequest={props.onRemoveRequest}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          css={menuStyles}
          onOpenAutoFocus={focusMenuBody}
        >
          <Header
            label={props.label}
            renderOperatorsInput={props.renderOperatorsInput}
            onSortRequest={props.onSortRequest}
          />
          <div css={menuBodyStyle} ref={menuBodyRef}>
            {props.renderMenuBody()}
          </div>
          <Footer
            onClearRequest={props.onClearRequest}
            renderApplyButton={props.renderApplyButton}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default FilterMenu;
