import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import MultilineTextField, {
  TMultiTextFieldProps,
} from './multiline-text-field';
import { useEffect, useState } from 'react';

const meta: Meta<TMultiTextFieldProps> = {
  title: 'Form/Fields/MultilineTextField',
  component: MultilineTextField as React.ComponentType<TMultiTextFieldProps>,
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

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <MultilineTextField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <MultilineTextField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <MultilineTextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
    </>
  ),
};
