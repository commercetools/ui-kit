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

const withControlledValue = <T extends {}>(
  Component: FunctionComponent<T & TControlledComponentProps>,
  controlledArgName = 'value',
  controlledArgHandlerName = 'onChange'
) => {
  const WithControlledValue: StoryObj['render'] = (allStoryArgs) => {
    const [args, updateArgs] = useArgs();

    const _onChange = (event: TCustomEvent) => {
      updateArgs({ value: event.target.value });
      args[controlledArgHandlerName](event);
    };

    const props = {
      ...(allStoryArgs as T),
      [controlledArgName]: args[controlledArgName],
      [controlledArgHandlerName]: _onChange,
    };

    return <Component {...props} />;
  };

  return WithControlledValue;
};

export default withControlledValue;
