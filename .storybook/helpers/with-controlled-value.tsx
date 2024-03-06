// @ts-ignore
import React, { type ComponentType, type FunctionComponent } from 'react';
import type { ActionMeta } from 'react-select';
import type { StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

export type TCustomEvent = {
  target: {
    value: string;
  };
  persist: () => void;
};

type TControlledComponentProps = {
  value?: unknown;
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
};

const withControlledValue = <T extends {}>(
  Component: ComponentType<T & TControlledComponentProps>
) => {
  const WithControlledValue: StoryObj['render'] = (args) => {
    const [{ value, onChange }, updateArgs] = useArgs();

    const _onChange = (event: TCustomEvent) => {
      updateArgs({ value: event.target.value });
      onChange(event);
    };

    const props = {
      ...(args as T),
      value,
      onChange: _onChange,
    };

    return <Component {...props} />;
  };

  return WithControlledValue;
};

export default withControlledValue;
