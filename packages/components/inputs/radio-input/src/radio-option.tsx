// TODO: @redesign cleanup
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';
import { useTheme } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterInvalidAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import {
  getLabelStyles,
  getContainerStyles,
  LabelTextWrapper,
  RadioOptionWrapper,
  AdditionalTextWrapper,
  RadioOptionKnob,
  RadioOptionBorder,
  Input,
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
> & { isNewTheme?: boolean };

const Option = (props: TOptionProps) => {
  const { isNewTheme } = useTheme();
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
    isNewTheme,
  };

  return (
    <label
      css={getLabelStyles(stylesProps)}
      role="radio"
      aria-checked={props.isChecked}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      {...filterInvalidAttributes(labelProps)}
    >
      <RadioOptionWrapper>
        <Input
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
          aria-readonly={props.isReadOnly}
          {...filterDataAttributes(props)}
        />
        <div css={getContainerStyles(stylesProps)}>
          <RadioOptionBorder {...stylesProps}>
            {props.isChecked ? <RadioOptionKnob {...stylesProps} /> : null}
          </RadioOptionBorder>
        </div>
        <LabelTextWrapper isDisabled={props.isDisabled} isNewTheme={isNewTheme}>
          {props.children}
        </LabelTextWrapper>
        {props.additionalContent && (
          <AdditionalTextWrapper
            isDisabled={props.isDisabled}
            isNewTheme={isNewTheme}
          >
            <SpacingsInset scale="xs">{props.additionalContent}</SpacingsInset>
          </AdditionalTextWrapper>
        )}
      </RadioOptionWrapper>
    </label>
  );
};
Option.displayName = 'RadioOption';

Option.defaultProps = {
  components: {},
};

export default Option;
