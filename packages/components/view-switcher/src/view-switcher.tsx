import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  type ReactNode,
  type ReactElement,
} from 'react';
import { css } from '@emotion/react';
import ViewSwitcherButton from './view-switcher-button';
import { warning } from '@commercetools-uikit/utils';

type TReactChild = {
  type?: { displayName: string };
} & ReactElement;

export type TViewSwitcherProps = {
  /**
   * Indicates that the view switcher can be reduced to save space
   */
  isCondensed?: boolean;
  /**
   * Pass one or more `ViewSwitcher.Button` components
   */
  children: ReactNode;
  /**
   * Will be triggered whenever a `ViewSwitcher.Button` is selected. Called with the ViewSwitcherButton value
   */
  onChange?: (value: string) => void;
  /**
   * Indicates the default selected button
   */
  defaultSelected: string;
};

const ViewSwitcher = (props: TViewSwitcherProps) => {
  const [selectedButton, setSelectedButton] = useState<string>(
    props.defaultSelected
  );

  warning(
    (props.children as TReactChild[]).length > 0,
    'ViewSwitcher.Group must contain at least one ViewSwitcher.Button'
  );

  const viewSwitcherElements = Children.map(props.children, (child, index) => {
    if (
      child &&
      isValidElement(child) &&
      (child as TReactChild).type.displayName === ViewSwitcherButton.displayName
    ) {
      const isButtonActive = selectedButton === child.props.value;
      const clonedChild = cloneElement(child, {
        onClick: () => {
          setSelectedButton(child.props.value);
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
  });

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
