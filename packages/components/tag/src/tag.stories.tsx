import { BrowserRouter as Router } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import Tag, { TTagProps } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'components/Tags/Tag',
  component: Tag,
};
export default meta;

type Story = StoryObj<typeof Tag>;

/** Displays a single `<Tag/>`.*/
export const BasicExample: Story = (args: TTagProps) => {
  return (
    <Router>
      <Tag {...args} />
    </Router>
  );
};

BasicExample.args = {
  type: 'normal',
  isDisabled: false,
  to: '/project-key/products/icecream',
  onRemove: () => alert('Remove tag request'),
  children: 'Ice Cream',
};
