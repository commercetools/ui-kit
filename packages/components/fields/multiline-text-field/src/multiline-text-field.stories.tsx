import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import MultilineTextField, {
  TMultiTextFieldProps,
} from './multiline-text-field';
import { useEffect, useState } from 'react';

const meta: Meta<TMultiTextFieldProps> = {
  title: 'Form/Fields/MultilineTextField',
  component: MultilineTextField,
  argTypes: {
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<TMultiTextFieldProps>;

export const BasicExample: Story = (args) => {
  const { defaultExpandMultilineText } = args;
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <MultilineTextField
      {...args}
      key={
        defaultExpandMultilineText ? 'default-expanded' : 'not-default-expanded'
      }
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
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
  value: '',
};
