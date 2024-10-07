import type { ReactElement } from 'react';

import type {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  InputProps,
  LoadingIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
} from 'react-select';

export type TReactSelectCustomComponentsProps<
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> =
  | ClearIndicatorProps<Option, isMulti, Group>
  | ControlProps<Option, isMulti, Group>
  | DropdownIndicatorProps<Option, isMulti, Group>
  | GroupProps<Option, isMulti, Group>
  | GroupHeadingProps<Option, isMulti, Group>
  | IndicatorsContainerProps<Option, isMulti, Group>
  | IndicatorSeparatorProps<Option, isMulti, Group>
  | InputProps<Option, isMulti, Group>
  | LoadingIndicatorProps<Option, isMulti, Group>
  | MenuProps<Option, isMulti, Group>
  | MenuListProps<Option, isMulti, Group>
  | NoticeProps<Option, isMulti, Group>
  | MultiValueProps<Option, isMulti, Group>
  | MultiValueGenericProps<Option, isMulti, Group>
  | MultiValueRemoveProps<Option, isMulti, Group>
  | OptionProps<Option, isMulti, Group>
  | PlaceholderProps<Option, isMulti, Group>
  | ContainerProps<Option, isMulti, Group>
  | SingleValueProps<Option, isMulti, Group>
  | ValueContainerProps<Option, isMulti, Group>;

export type TSelectInputCustomComponentProps<
  T extends TReactSelectCustomComponentsProps<Option, isMulti, Group>,
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = T & {
  selectProps: T['selectProps'] & {
    isCondensed?: boolean;
    isReadOnly?: boolean;
    iconLeft?: ReactElement;
  };
};

/**
 * @deprecated Use `TTagRemoveProps['selectProps]` instead
 */
export type TTagRemoveSelectProps = {
  isReadOnly: boolean;
} & MultiValueGenericProps['selectProps'];

/**
 * @deprecated Use `TWrapperWithIconProps['selectProps]` instead
 */
export type TWrapperWithIconSelectProps = {
  iconLeft?: ReactElement;
};
