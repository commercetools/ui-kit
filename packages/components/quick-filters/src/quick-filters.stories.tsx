import type { Meta, StoryObj } from '@storybook/react';
import QuickFilters from './quick-filters';

const meta: Meta<typeof QuickFilters> = {
  title: 'components/QuickFilters',
  component: QuickFilters,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof QuickFilters>;

export const BasicExample: Story = {
  args: {
    label: 'A component for applying static filter controls',
  },
};
