import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from './link';

const meta: Meta<typeof Link> = {
  title: 'components/Link',
  component: Link,
};
export default meta;

type Story = StoryObj<typeof Link>;

export const BasicExample: Story = {
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  args: {
    children: 'Sample Link',
    to: '/path/to/link/to',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Text',
    to: '/path/to/link/to',
    isExternal: true,
  },

  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};
