import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import MultilineTextField from './multiline-text-field';
import { useState } from 'react';

const meta: Meta<typeof MultilineTextField> = {
  title: 'field/MultilineTextField',
  // @ts-expect-error, fix component and/or types
  component: MultilineTextField,
  argTypes: {
    // @ts-expect-error
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof MultilineTextField>;

export const BasicExample: Story = (args) => {
  // @ts-expect-error
  const { defaultExpandMultilineText } = args;
  const [value, onChange] = useState('');

  return (
    <MultilineTextField
      {...args}
      key={
        defaultExpandMultilineText ? 'default-expanded' : 'not-default-expanded'
      }
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'multiline-text-field-id',
  name: 'multiline-text-field-name',
  horizontalConstraint: 7,
  warnings: {
    customWarning: true,
  },
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
  renderWarning: (key: string) => {
    switch (key) {
      case 'customWarning':
        return 'A custom warning.';
      default:
        return null;
    }
  },
  isRequired: false,
  touched: false,
  isAutofocussed: false,
  isDisabled: false,
  defaultExpandMultilineText: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Description',
  hint: 'Enter a description',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  badge: '',
};
