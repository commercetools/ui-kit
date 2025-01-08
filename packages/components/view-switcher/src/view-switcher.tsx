import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  type ReactNode,
  type ReactElement,
} from 'react';
import isNil from 'lodash/isNil';
import { css } from '@emotion/react';
import ViewSwitcherButton from './view-switcher-button';
import { warning } from '@commercetools-uikit/utils';

export type TViewSwitcherChildProps = {
  value: string;
  onClick?: Function;
} & Record<string, unknown>;

type TReactChild = {
  type?: { displayName: string };
} & ReactElement<TViewSwitcherChildProps>;

export type TViewSwitcherProps = {
  /**
   * Indicates that the view switcher can be reduced to save space.
   */
  isCondensed?: boolean;
  /**
   * Pass one or more `ViewSwitcher.Button` components.
   */
  children: ReactNode;
  /**
   * Will be triggered whenever a `ViewSwitcher.Button` is selected. Called with the ViewSwitcherButton value.
   * This function is only required when the component is controlled.
   */
  onChange?: (value: string) => void;
  /**
   * Passing this prop makes the component an uncontrolled component.
   * Indicates the default selected button it is only used to as an initial state once, when the component mounts.
   */
  defaultSelected?: string;
  /**
   * Passing this prop makes the component an controlled component.
   * Controlled components also require to pass a `onChange` callback function.
   */
  selectedValue?: string;
};

const ViewSwitcher = (props: TViewSwitcherProps) => {
  const isControlledComponent = !isNil(props.selectedValue);
  const hasOnChange = !isNil(props.onChange);
  /**
   * This internal state is only used when the component is uncontrolled ("defaultSelected" is passed).
   * When controlled ("selectedValue") the state will not be updated or used.
   */
  const [selectedButton, setSelectedButton] = useState<string | undefined>(
    props.defaultSelected
  );

  if (isControlledComponent) {
    warning(
      hasOnChange,
      `ui-kit/ViewSwitcher: missing required prop "onChange" when using the "value" prop (controlled component).`
    );
  }

  warning(
    !props.selectedValue || !props.defaultSelected,
    `ui-kit/ViewSwitcher: passed both "selectedValue" (uncontrolled component) prop and "defaultSelected" (uncontrolled component). Please pass only one as the component can only be either controlled or uncontrolled.`
  );

  warning(
    (props.children as TReactChild[]).length > 0,
    'ViewSwitcher.Group must contain at least one ViewSwitcher.Button'
  );

  const viewSwitcherElements = Children.map(
    props.children as TReactChild[],
    (child, index) => {
      if (
        child &&
        isValidElement(child) &&
        child.type.displayName === ViewSwitcherButton.displayName
      ) {
        const isButtonActive =
          (isControlledComponent ? props.selectedValue : selectedButton) ===
          child.props.value;
        const clonedChild = cloneElement(child, {
          onClick: () => {
            if (!isControlledComponent) {
              setSelectedButton(child.props.value);
            }

            if (!isButtonActive) {
              child.props.onClick?.(child.props.value);
              props.onChange?.(child.props.value);
            }
          },
          isCondensed: props.isCondensed,
          isActive: isButtonActive,
          isFirstButton: index === 0,
          isLastButton:
            index === ((props.children as TReactChild[]).length ?? 1) - 1,
        });
        return clonedChild;
      }
      return child;
    }
  );

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {viewSwitcherElements}
    </div>
  );
};

export default ViewSwitcher;
