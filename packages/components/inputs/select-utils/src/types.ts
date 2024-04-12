import type SelectComponents from 'react-select';

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

export type TReactSelectCustomComponentsProps = {
  [K in keyof SelectComponents]: ComponentProps<SelectComponents[K]>;
}[keyof SelectComponents];

export type TSelectInputCustomComponentProps<
  T extends TReactSelectCustomComponentsProps
> = T & {
  selectProps: T['selectProps'] & {
    isCondensed?: boolean;
  };
};
