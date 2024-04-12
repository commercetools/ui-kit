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

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

export type TReactSelectCustomComponentsProps = {
  [K in keyof SelectComponents]: ComponentProps<SelectComponents[K]>;
}[keyof SelectComponents];

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
