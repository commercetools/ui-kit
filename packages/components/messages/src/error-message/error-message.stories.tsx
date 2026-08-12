import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorMessage from './error-message';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof ErrorMessage> = {
  title: 'components/Messages/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    intlMessage: { control: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const BasicExample: Story = {
  args: {
    children: 'Required text missing',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VisualSpec label="ErrorMessage">
      <ErrorMessage>An error message</ErrorMessage>
    </VisualSpec>
  ),
};
