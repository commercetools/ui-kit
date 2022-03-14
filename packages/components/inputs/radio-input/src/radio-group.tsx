import {
  useEffect,
  Children,
  cloneElement,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';
import { warning, filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Stack, { type TStackProps } from '@commercetools-uikit/spacings-stack';
import Inline from '@commercetools-uikit/spacings-inline';
import Option from './radio-option';

const directionWrapper = {
  stack: Stack,
  inline: Inline,
};

export type TGroupProps = {
  id?: string;
  name?: string;
  value: string | boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLLabelElement>;
  onFocus?: FocusEventHandler<HTMLLabelElement>;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  horizontalConstraint?:
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  direction?: keyof typeof directionWrapper;
  directionProps?: Partial<TStackProps>;
  children: ReactNode;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
};

const defaultProps: Pick<
  TGroupProps,
  'horizontalConstraint' | 'direction' | 'directionProps'
> = {
  horizontalConstraint: 'scale',
  direction: 'stack',
  directionProps: {
    scale: 'm',
  },
};

type TReactChild = {
  type?: { displayName: string };
} & ReactElement;

const Group = (props: TGroupProps) => {
  useEffect(() => {
    // NOTE: We allow mixed children rendered as (e.g. spacers)
    // as a result we need to filter out children of the correct type.
    const childrenAsArray = Children.toArray(props.children) as TReactChild[];
    const optionChildrenAsArray = childrenAsArray.filter(
      (child) => child.type.displayName === Option.displayName
    );

    warning(
      optionChildrenAsArray.length > 0,
      'Radio.Group must contain at least one Radio.Option'
    );
  }, [props.children]);

  const optionElements = Children.map(props.children, (child, index) => {
    // NOTE: Allowing to intersperse other elements than `Option`.
    if (
      child &&
      isValidElement(child) &&
      (child as TReactChild).type.displayName === Option.displayName
    ) {
      const clonedChild = cloneElement(child, {
        id: props.id && `${props.id}-${index}`,
        name: props.name,
        isChecked: props.value === child.props.value,
        isDisabled: child.props.isDisabled || props.isDisabled,
        isReadOnly: props.isReadOnly,
        hasError: props.hasError,
        hasWarning: props.hasWarning,
        onChange: props.onChange,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
      });
      const { wrapper } = child.props.components;
      return wrapper ? wrapper(clonedChild) : clonedChild;
    }
    return child;
  });
  if (props.direction === 'inline') {
    return (
      <div
        aria-labelledby={props.id}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
      >
        <Inline {...props.directionProps} {...filterDataAttributes(props)}>
          {optionElements}
        </Inline>
      </div>
    );
  }
  return (
    <div
      aria-labelledby={props.id}
      aria-invalid={props['aria-invalid']}
      aria-errormessage={props['aria-errormessage']}
    >
      <Constraints.Horizontal max={props.horizontalConstraint}>
        <Stack {...props.directionProps} {...filterDataAttributes(props)}>
          {optionElements}
        </Stack>
      </Constraints.Horizontal>
    </div>
  );
};

Group.displayName = 'RadioGroup';

Group.defaultProps = defaultProps;

export default Group;
