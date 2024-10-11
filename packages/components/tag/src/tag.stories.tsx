import { BrowserRouter as Router } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from './tag';

const meta: Meta<typeof Tag> = {
  title: 'components/Tags/Tag',
  component: Tag,
};
export default meta;

type Story = StoryObj<typeof Tag>;

/** Display a plain tag, unlinked and without any actions attached */
export const BasicExample: Story = {
  render: (args) => {
    return (
      <Router>
        <Tag {...args} />
      </Router>
    );
  },
  args: {
    tone: 'primary',
    children: 'Ice Cream',
    onRemove: undefined,
    onClick: undefined,
  },
};

/** displays the tag as a react-router link, (no hover effects) */
export const LinkedTag: Story = {
  ...BasicExample,
  args: {
    ...BasicExample.args,
    to: '/ice-cream',
  },
};

/** a tag with a click-action attached*/
export const ClickableTag: Story = {
  ...BasicExample,
  args: {
    ...BasicExample.args,
    onClick: () => alert('You clicked me!'),
  },
};

/** supply an `onRemove` handler to display an `x`-button*/
export const RemovableTag: Story = {
  ...BasicExample,
  args: {
    ...BasicExample.args,
    onRemove: () => alert('You clicked remove!'),
  },
};
