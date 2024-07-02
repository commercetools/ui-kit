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
  Component: FunctionComponent<T & TControlledComponentProps>
) => {
  const withControlledValue: StoryObj['render'] = (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

  return withControlledValue;
};

export default withControlledValue;
