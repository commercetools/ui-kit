import type { ReactElement } from 'react';

import type {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
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

import type {
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
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

export type TReactSelectCustomComponentsProps =
  | ClearIndicatorProps
  | ControlProps
  | DropdownIndicatorProps
  | GroupProps
  | GroupHeadingProps
  | IndicatorsContainerProps
  | IndicatorSeparatorProps
  | InputProps
  | LoadingIndicatorProps
  | MenuProps
  | MenuListProps
  | NoticeProps
  | MultiValueProps
  | MultiValueGenericProps
  | MultiValueRemoveProps
  | OptionProps
  | PlaceholderProps
  | ContainerProps
  | SingleValueProps
  | ValueContainerProps;

export type TSelectInputCustomComponentProps<
  T extends TReactSelectCustomComponentsProps
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
