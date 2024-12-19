import { ReactNode } from 'react';
import isNil from 'lodash/isNil';
import { warning } from '@commercetools-uikit/utils';
import { useToggleState } from '@commercetools-uikit/hooks';

type TToggleCallback = (toggleState?: boolean) => void;
export type TCollapsibleProps = {
  /**
   * This is only used to initialize the `isOpen` state once, when the component mounts.
   * Therefore there should not be any `componentWillReceiveProps` to update the state
   * from an external source.
   */
  isDefaultClosed?: boolean;
  /**
   * A render-prop function.
   * <br/>
   * `children` will be called with `options: { isOpen: boolean; toggle: TToggleCallback }`
   * <br />
   * `options.toggle` will be defined given that Collapsible is a controlled component.
   */
  children: (options: {
    isOpen: boolean;
    toggle?: TToggleCallback;
  }) => ReactNode;
  /**
   * Passing this prop makes the component a controlled component.
   * Controlled components also require to pass a `onToggle` callback function.
   */
  isClosed?: boolean;
  /**
   * A callback function, called when the consumer calls the `toggle` function.
   * This function is only required when the component is controlled.
   */
  onToggle?: TToggleCallback;
};

const ControlledCollapsible = (
  props: Pick<TCollapsibleProps, 'isClosed' | 'onToggle' | 'children'>
) => (
  <>
    {props.children({
      isOpen: !props.isClosed,
      toggle: props.onToggle,
    })}
  </>
);
ControlledCollapsible.displayName = 'ControlledCollapsible';

const UncontrolledCollapsible = (
  props: Pick<TCollapsibleProps, 'children' | 'isDefaultClosed'>
) => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);
  return (
    <>
      {props.children({
        isOpen,
        toggle,
      })}
    </>
  );
};
UncontrolledCollapsible.displayName = 'UncontrolledCollapsible';

const Collapsible = ({
  isDefaultClosed = false,
  ...props
}: TCollapsibleProps) => {
  const isControlledComponent = !isNil(props.isClosed);
  const hasOnToggle = !isNil(props.onToggle);

  if (isControlledComponent) {
    warning(
      hasOnToggle,
      `ui-kit/Collapsible: missing required prop "onToggle" when using the "isClosed" prop (controlled component).`
    );
    return <ControlledCollapsible {...props} />;
  }

  warning(
    !hasOnToggle,
    `ui-kit/Collapsible: the prop "onToggle" does not have any effect (uncontrolled component). Please remove it.`
  );
  return (
    <UncontrolledCollapsible isDefaultClosed={isDefaultClosed} {...props} />
  );
};

Collapsible.displayName = 'Collapsible';

export default Collapsible;
