import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from './text-input';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof TextInput> = {
  title: 'Form/Inputs/TextInput',
  component: TextInput,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const BasicExample: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};

const value = 'hello world how are you?';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <TextInput value={value} onChange={() => {}} horizontalConstraint={7} />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <TextInput
          isDisabled={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <TextInput
          isReadOnly={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <TextInput
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <TextInput
          isDisabled={true}
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with error">
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with warning">
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with isCondensed">
        <TextInput
          value={value}
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={7}
          isDisabled={true}
          hasWarning={true}
        />
      </VisualSpec>
    </>
  ),
};
