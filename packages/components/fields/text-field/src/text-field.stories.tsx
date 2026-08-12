import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import TextField from './text-field';
import { useState } from 'react';

const meta: Meta<typeof TextField> = {
  title: 'Form/Fields/TextField',
  // @ts-expect-error, @todo: fix component and/or types
  component: TextField,
  argTypes: {
    // @ts-expect-error
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
    additionalInfo: { control: 'text' },
  },
};
export default meta;

type Story = StoryFn<typeof TextField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('');

  return (
    // @ts-expect-error
    <TextField
      {...args}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'text-field-id',
  name: 'text-field-name',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
  warnings: {
    customWarning: true,
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
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Username',
  hint: 'Enter your username',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  additionalInfo: 'Only use letters, numbers, and underscores',
  badge: '',
};

const value = 'hello world, how are you?';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <TextField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown and disabled">
        <TextField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with isCondensed">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="with additionalInfo prop">
        <TextField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isCondensed={true}
          additionalInfo="A string containing additional information"
        />
      </VisualSpec>
    </>
  ),
};
