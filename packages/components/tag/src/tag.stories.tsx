import { BrowserRouter as Router } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec, VisualSpecGroup } from '@/storybook-helpers';
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

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
metus ultrices, interdum augue eget, consequat orci. Nam et nisi
eleifend, fermentum nunc non, sagittis tortor. Pellentesque vulputate
dignissim leo fermentum vehicula. Fusce efficitur est molestie augue
ullamcorper dictum. Donec non leo a augue dictum pretium. Praesent ac
quam pharetra, posuere mauris in, pharetra nisi.`;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  render: () => (
    <>
      <VisualSpecGroup label="without `to`">
        <VisualSpec label="Normal">
          <Tag type="normal">Tag</Tag>
        </VisualSpec>
        <VisualSpec label="Normal - onRemove">
          <Tag type="normal" onRemove={() => {}}>
            With remove
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 1">
          <Tag type="normal" horizontalConstraint={1}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 3">
          <Tag type="normal" horizontalConstraint={3}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 7">
          <Tag type="normal" horizontalConstraint={7}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 10">
          <Tag type="normal" horizontalConstraint={10}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 16">
          <Tag type="normal" horizontalConstraint={16}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Warning">
          <Tag type="warning">Warning message</Tag>
        </VisualSpec>
        <VisualSpec label="Warning - disabled">
          <Tag type="warning" isDisabled>
            Warning but disabled
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - multiple lines of text">
          <Tag type="normal">{longText}</Tag>
        </VisualSpec>
        <VisualSpec label="Normal - multiple lines of text - onRemove">
          <Tag type="normal" onRemove={() => {}}>
            {longText}
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - onRemove (disabled)">
          <Tag type="normal" onRemove={() => {}} isDisabled>
            {longText}
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - isDraggable">
          <Tag type="normal" isDraggable>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - isDraggable (disabled)">
          <Tag type="normal" isDraggable isDisabled>
            Tag
          </Tag>
        </VisualSpec>
      </VisualSpecGroup>

      <VisualSpecGroup label="with `to`">
        <VisualSpec label="Normal">
          <Tag type="normal" to="foo/bar">
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - onRemove">
          <Tag type="normal" to="foo/bar" onRemove={() => {}}>
            With remove
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 1">
          <Tag type="normal" to="foo/bar" horizontalConstraint={1}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 3">
          <Tag type="normal" to="foo/bar" horizontalConstraint={3}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 7">
          <Tag type="normal" to="foo/bar" horizontalConstraint={7}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 10">
          <Tag type="normal" to="foo/bar" horizontalConstraint={10}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - horizontalConstraint - 16">
          <Tag type="normal" to="foo/bar" horizontalConstraint={16}>
            Tag
          </Tag>
        </VisualSpec>
        <VisualSpec label="Warning">
          <Tag type="warning" to="foo/bar">
            Warning message
          </Tag>
        </VisualSpec>
        <VisualSpec label="Warning - disabled">
          <Tag type="warning" to="foo/bar" isDisabled>
            Warning but disabled
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - multiple lines of text">
          <Tag type="normal" to="foo/bar">
            {longText}
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - multiple lines of text - onRemove">
          <Tag type="normal" to="foo/bar" onRemove={() => {}}>
            {longText}
          </Tag>
        </VisualSpec>
        <VisualSpec label="Normal - onRemove (disabled)">
          <Tag type="normal" to="foo/bar" onRemove={() => {}} isDisabled>
            {longText}
          </Tag>
        </VisualSpec>
      </VisualSpecGroup>

      <VisualSpec label="Tag: available 'tones'">
        <div>
          <Tag tone="primary">primary tone</Tag>
          <Tag tone="warning">warning tone</Tag>
          <Tag tone="surface">surface tone</Tag>
        </div>
      </VisualSpec>
    </>
  ),
};
