import type { Meta, StoryObj } from '@storybook/react';
import ContentNotification from './content-notification';

const meta: Meta<typeof ContentNotification> = {
  title: 'components/Notification/ContentNotification',
  component: ContentNotification,
  argTypes: {
    intlMessage: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof ContentNotification>;

export const BasicExample: Story = {
  args: {
    children: 'I can display different kinds of notifications!',
    type: 'warning',
    onRemove: undefined,
  },
};

/** Provide an `onRemove` function to display a Close-Button: */
export const DismissableNotification: Story = {
  args: {
    children: 'Fabulous, everything went as expected!',
    type: 'success',
    onRemove: () => alert('Notification close clicked!'),
  },
};
