import type { Meta, StoryObj } from '@storybook/react-vite';
import PasswordInput from './password-input';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof PasswordInput> = {
  title: 'Form/Inputs/PasswordInput',
  component: PasswordInput,
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const BasicExample: Story = {
  args: {
    name: 'password',
    placeholder: 'Password',
    horizontalConstraint: 7,
  },
};

const value = 'hello world how are you?';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <PasswordInput
          isDisabled={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <PasswordInput
          isReadOnly={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <PasswordInput
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <PasswordInput
          isDisabled={true}
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
    </>
  ),
};
