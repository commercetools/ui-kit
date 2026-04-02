import type { Meta, StoryObj } from '@storybook/react';
import { UIKitProvider } from '@commercetools-uikit/ui-kit-provider';
import Tag from './tag';

// no-op navigate for storybook
const storyRouter = { navigate: () => {} };

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
      <UIKitProvider router={storyRouter}>
        <Tag {...args} />
      </UIKitProvider>
    );
  },
  args: {
    tone: 'primary',
    children: 'Ice Cream',
    onRemove: undefined,
    onClick: undefined,
  },
};

/** displays the tag as a link (no hover effects) */
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
