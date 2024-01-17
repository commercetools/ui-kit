import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from './link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '/foo/bar',
    isExternal: false,
    children: 'Accessibility text',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['primary', 'inverted', 'secondary'],
    },
  },
  render: (args) => {
    return (
      <Router>
        <Link {...args} />
      </Router>
    );
  },
};
