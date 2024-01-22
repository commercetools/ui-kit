// @ts-ignore
import React, { type FunctionComponent } from 'react';
import type { ActionMeta } from 'react-select';
import type { StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

export type TCustomEvent = {
  target: {
    value: string;
  };
};

type TControlledComponentProps = {
  value?: unknown;
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
};

type TWithControlledValueProps<T> = {
  Component: FunctionComponent<T> & TControlledComponentProps;
  controlledArgName?: string;
  controlledArgHandlerName?: string;
};

const withControlledValue = <T extends {}>({
  Component,
  controlledArgName,
  controlledArgHandlerName,
}: TWithControlledValueProps<T>) => {
  const WithControlledValue: StoryObj['render'] = (allStoryArgs) => {
    const [args, updateArgs] = useArgs();

    const controlledArgNameOrDefault = controlledArgName || 'value';
    const controlledArgHandlerNameOrDefault =
      controlledArgHandlerName || 'onChange';

    const _onChange = (event: TCustomEvent) => {
      updateArgs({ value: event.target.value });
      args[controlledArgHandlerNameOrDefault](event);
    };

    const props = {
      ...(allStoryArgs as T),
      [controlledArgNameOrDefault]: args[controlledArgNameOrDefault],
      [controlledArgHandlerNameOrDefault]: _onChange,
    };

    return <Component {...props} />;
  };

  return WithControlledValue;
};

export default withControlledValue;
