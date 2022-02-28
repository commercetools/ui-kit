import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from 'react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterInvalidAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';
import { RadioOptionCheckedIcon, RadioOptionUncheckedIcon } from './icons';
import {
  getLabelStyles,
  getContainerStyles,
  LabelTextWrapper,
  RadioOptionsWrapper,
  AdditionalTextWrapper,
} from './radio-option.styles';
import SpacingsInset from '@commercetools-uikit/spacings-inset';

const Input = styled.input`
  &:focus + div > svg *[data-style='radio-option__border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }
`;

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
  onChange?: ChangeEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;

  // This prop forces Radio.Option to be rendered in a hovered state (though isDisabled takes
  // precedence over that). We need that to address a use-case when hovering is comming
  // from somewhere up the hierarchy. There is no need to touch this prop in case
  // all you need is a general highlighting on hover of Radio.Option body, which is solved
  // by a corresponding :hover selector in the syles of this component.
  isHovered?: boolean;
};

const Option = (props: TOptionProps) => {
  const labelProps = props.id ? { htmlFor: props.id } : {};

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

  return (
    <label
      css={getLabelStyles(props)}
      role="radio"
      aria-checked={props.isChecked}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      {...filterInvalidAttributes(labelProps)}
    >
      <RadioOptionsWrapper>
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
        <div css={getContainerStyles(props)}>
          {props.isChecked ? (
            <RadioOptionCheckedIcon size="medium" />
          ) : (
            <RadioOptionUncheckedIcon size="medium" />
          )}
        </div>
        <LabelTextWrapper isDisabled={props.isDisabled}>
          {props.children}
        </LabelTextWrapper>
        {props.additionalContent && (
          <AdditionalTextWrapper isDisabled={props.isDisabled}>
            <SpacingsInset scale="xs">{props.additionalContent}</SpacingsInset>
          </AdditionalTextWrapper>
        )}
      </RadioOptionsWrapper>
    </label>
  );
};
Option.displayName = 'RadioOption';

Option.defaultProps = {
  components: {},
};

export default Option;
