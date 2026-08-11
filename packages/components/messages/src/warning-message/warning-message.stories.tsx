import type { Meta, StoryObj } from '@storybook/react-vite';
import WarningMessage from './warning-message';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof WarningMessage> = {
  title: 'components/Messages/WarningMessage',
  component: WarningMessage,
  argTypes: {
    intlMessage: { control: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof WarningMessage>;

export const BasicExample: Story = {
  args: {
    children: 'This name is already being used by another variant',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VisualSpec label="WarningMessage">
      <WarningMessage>A warning message</WarningMessage>
    </VisualSpec>
  ),
};
