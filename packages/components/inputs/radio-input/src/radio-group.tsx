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
import Stack from '@commercetools-uikit/spacings-stack';
import Inline, {
  type TInlineProps,
} from '@commercetools-uikit/spacings-inline';
import Option, { type TOptionProps } from './radio-option';

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
  /** Pick the desired layout. Possible values are `stack` or `inline`, (= Radio.Option items will be
   * wrapped with the `Spacing.Stack` or `Spacing.Inline` component)*/
  direction?: 'stack' | 'inline';
  /** Props uesed to configue the selected layout component that was picked via the `direction` property */
  directionProps?: {
    scale?: TInlineProps['scale'];
    alignItems?: TInlineProps['alignItems'];
    justifyContent?: TInlineProps['justifyContent'];
  };
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

type TReactChild = {
  type?: { displayName: string };
} & ReactElement<TOptionProps>;

const Group = ({
  horizontalConstraint = 'scale',
  direction = 'stack',
  directionProps = {
    scale: 'm',
  },
  ...props
}: TGroupProps) => {
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

  const optionElements = Children.map(
    props.children as TReactChild[],
    (child, index) => {
      // NOTE: Allowing to intersperse other elements than `Option`.
      if (
        child &&
        isValidElement(child) &&
        child.type.displayName === Option.displayName
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
        const { wrapper } = child.props.components || {};
        return wrapper ? wrapper(clonedChild) : clonedChild;
      }
      return child;
    }
  );
  if (direction === 'inline') {
    return (
      <div
        aria-labelledby={props.id}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
      >
        <Inline
          {...directionProps}
          {...filterDataAttributes({
            horizontalConstraint,
            direction,
            ...props,
          })}
        >
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
      <Constraints.Horizontal max={horizontalConstraint}>
        <Stack
          {...directionProps}
          {...filterDataAttributes({
            horizontalConstraint,
            direction,
            ...props,
          })}
        >
          {optionElements}
        </Stack>
      </Constraints.Horizontal>
    </div>
  );
};

Group.displayName = 'RadioGroup';

export default Group;
