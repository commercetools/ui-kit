import type { Meta, StoryObj } from '@storybook/react';

import CollapsiblePanel from './collapsible-panel';

const meta = {
  title: 'Components/Panels/CollapsiblePanel',
  component: CollapsiblePanel,
  tags: ['autodocs'],
  args: {
    children: 'Sample text',
    header: 'Header',
  },
} satisfies Meta<typeof CollapsiblePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    secondaryHeader: 'Subtitle',
    description: 'Description',
    headerControls: 'headerControl',
  },
};
