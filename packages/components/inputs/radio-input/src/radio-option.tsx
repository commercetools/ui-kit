import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';
import {
  filterDataAttributes,
  filterInvalidAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import {
  LabelTextWrapper,
  RadioInputWrapper,
  AdditionalTextWrapper,
  RadioOptionKnob,
  RadioOptionBorder,
  RadioOptionLabel,
  RadioOptionContainer,
} from './radio-option.styles';
import SpacingsInset from '@commercetools-uikit/spacings-inset';

type TComponents = {
  wrapper?: (children: ReactElement) => ReactElement;
};

export type TOptionProps = {
  // Direct props
  value: string | boolean;
  children: string | ReactElement | (() => ReactElement);
  components?: TComponents;
  additionalContent?: ReactNode;
  // Injected props from the parent Group component
  id?: string;
  name?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLLabelElement>;
  onBlur?: FocusEventHandler<HTMLLabelElement>;

  // This prop forces Radio.Option to be rendered in a hovered state (though isDisabled takes
  // precedence over that). We need that to address a use-case when hovering is coming
  // from somewhere up the hierarchy. There is no need to touch this prop in case
  // all you need is a general highlighting on hover of Radio.Option body, which is solved
  // by a corresponding :hover selector in the syles of this component.
  isHovered?: boolean;
};

export type TStylesProps = Pick<
  TOptionProps,
  | 'isDisabled'
  | 'hasError'
  | 'hasWarning'
  | 'isHovered'
  | 'isReadOnly'
  | 'isChecked'
>;

const Option = (props: TOptionProps) => {
  const labelProps = props.id ? { htmlFor: props.id } : {};

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'RadioOption: `onChange` is required when input is not read only.'
    );
  }

  if (props.components?.wrapper) {
    warning(
      typeof props.components?.wrapper === 'function',
      `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the prop is not a function`
    );
    warning(
      props.components?.wrapper.length === 1,
      `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the supplied function should expect one argument`
    );
    warning(
      isValidElement(props.components?.wrapper(<></>)),
      `Invalid prop 'components.wrapper' supplied to 'RadioInput.Option': the function supplied should return a valid react element`
    );
  }

  const stylesProps: TStylesProps = {
    isDisabled: props.isDisabled,
    hasError: props.hasError,
    hasWarning: props.hasWarning,
    isHovered: props.isHovered,
    isReadOnly: props.isReadOnly,
    isChecked: props.isChecked,
  };

  return (
    <RadioOptionLabel
      role="radio"
      aria-checked={props.isChecked}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      {...stylesProps}
      {...filterInvalidAttributes(labelProps)}
    >
      <RadioInputWrapper>
        <input
          css={accessibleHiddenInputStyles}
          id={props.id}
          name={props.name}
          value={
            typeof props.value === 'boolean'
              ? props.value.toString()
              : props.value
          }
          onChange={props.isReadOnly ? undefined : props.onChange}
          disabled={props.isDisabled}
          checked={props.isChecked}
          type="radio"
          readOnly={props.isReadOnly}
          {...filterDataAttributes(props)}
        />
        <RadioOptionContainer {...stylesProps}>
          <RadioOptionBorder {...stylesProps}>
            {props.isChecked ? <RadioOptionKnob {...stylesProps} /> : null}
          </RadioOptionBorder>
        </RadioOptionContainer>
        <LabelTextWrapper isDisabled={props.isDisabled}>
          {props.children}
        </LabelTextWrapper>
        {props.additionalContent && (
          <AdditionalTextWrapper isDisabled={props.isDisabled}>
            <SpacingsInset scale="xs">{props.additionalContent}</SpacingsInset>
          </AdditionalTextWrapper>
        )}
      </RadioInputWrapper>
    </RadioOptionLabel>
  );
};
Option.displayName = 'RadioOption';

Option.defaultProps = {
  components: {},
};

export default Option;
