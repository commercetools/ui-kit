import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  type ReactElement,
} from 'react';
import { css } from '@emotion/react';
import ViewSwitcherButton from './view-switcher-button';
import { warning } from '@commercetools-uikit/utils';

type TReactChild = {
  type?: { displayName: string };
} & ReactElement;

export type TViewSwitcherProps = {
  isCondensed?: boolean;
  children: TReactChild[];
  onChange?: (value: string) => void;
  defaultSelected: string;
};

const ViewSwitcher = (props: TViewSwitcherProps) => {
  const [selectedButton, setSelectedButton] = useState<string>(
    props.defaultSelected
  );

  useEffect(() => {
    const childrenAsArray = Children.toArray(props.children) as TReactChild[];
    const optionChildrenAsArray = childrenAsArray.filter(
      (child) => child.type.displayName === ViewSwitcherButton.displayName
    );

    warning(
      optionChildrenAsArray.length > 0,
      'ViewSwitcher must contain at least one ViewSwitcherButton'
    );
  }, [props.children]);

  const viewSwitcherElements = Children.map(props.children, (child, index) => {
    if (
      child &&
      isValidElement(child) &&
      child.type.displayName === ViewSwitcherButton.displayName
    ) {
      const clonedChild = cloneElement(child, {
        onClick: () => {
          setSelectedButton(child.props.value);
          props.onChange && props.onChange(child.props.value);
          child.props.onClick && child.props.onClick();
        },
        isCondensed: props.isCondensed,
        isActive: selectedButton === child.props.value,
        isFirstButton: index === 0,
        isLastButton: index === (props.children.length ?? 1) - 1,
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
