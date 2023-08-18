declare module 'react-value' {
  import { ReactElement, ReactNode } from 'react';

  export type ValueProps<T> = {
    defaultValue?: T;
    onChange?: (value: T) => void;
    render: (value: T, onChange: (value: T) => void) => ReactNode;
  };

  export type ValueState<T> = {
    value: T;
  };

  export const Value: <T>(props: ValueProps<T>) => ReactElement<ValueProps<T>>;
}
