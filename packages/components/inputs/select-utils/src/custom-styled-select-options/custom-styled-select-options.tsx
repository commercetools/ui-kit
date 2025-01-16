import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { components, GroupBase, OptionProps } from 'react-select';
import { NO_VALUE_FALLBACK, SELECT_DROPDOWN_OPTION_TYPES } from './constants';

export type TData = {
  label?: string;
  key?: string;
  id?: string;
};

export type TSelectDropdownOptionTypesKeys =
  keyof typeof SELECT_DROPDOWN_OPTION_TYPES;
export type TDoublePropertySelectInputOptionProps<
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  data?: TData;
  noValueFallback?: string;
  optionType?: (typeof SELECT_DROPDOWN_OPTION_TYPES)[TSelectDropdownOptionTypesKeys];
} & OptionProps<Option, isMulti, Group>;

export const MultiplePropertiesSelectInputOption = <
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: TDoublePropertySelectInputOptionProps<Option, isMulti, Group>
) => {
  const { data } = props;
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;

  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail fontWeight="bold">
          {data?.label || noValueFallback}
        </Text.Detail>
        <Text.Detail>Key: {data?.key || noValueFallback}</Text.Detail>
        <Text.Detail>ID: {data?.id || noValueFallback}</Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

MultiplePropertiesSelectInputOption.displayName =
  'MultiplePropertiesSelectInputOption';

export const DoublePropertySelectInputOption = <
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: TDoublePropertySelectInputOptionProps<Option, isMulti, Group>
) => {
  const { data } = props;
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;
  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail fontWeight="bold">
          {data?.label || noValueFallback}
        </Text.Detail>
        <Text.Detail>Key: {data?.key || noValueFallback}</Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

DoublePropertySelectInputOption.displayName = 'DoublePropertySelectInputOption';

export type TCustomSelectInputOptionProps<
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  optionInnerProps: TDoublePropertySelectInputOptionProps<
    Option,
    isMulti,
    Group
  >;
} & TDoublePropertySelectInputOptionProps<Option, isMulti, Group>;

export const CustomSelectInputOption = <
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: TCustomSelectInputOptionProps<Option, isMulti, Group>
) => {
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;

  switch (props.optionType) {
    case SELECT_DROPDOWN_OPTION_TYPES.MULTIPLE_PROPERTIES:
      return (
        <MultiplePropertiesSelectInputOption
          {...props.optionInnerProps}
          noValueFallback={noValueFallback}
        />
      );
    case SELECT_DROPDOWN_OPTION_TYPES.DOUBLE_PROPERTY:
      return (
        <DoublePropertySelectInputOption
          {...props.optionInnerProps}
          noValueFallback={noValueFallback}
        />
      );
    default:
      return (
        <components.Option {...props.optionInnerProps}>
          <Text.Detail>
            {props.optionInnerProps.data?.label || noValueFallback}
          </Text.Detail>
        </components.Option>
      );
  }
};

CustomSelectInputOption.displayName = 'CustomSelectInputOption';
