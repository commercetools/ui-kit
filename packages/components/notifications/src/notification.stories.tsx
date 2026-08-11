import type { Meta, StoryObj } from '@storybook/react-vite';
import ContentNotification from './content-notification';
import { VisualSpec } from '@/storybook-helpers';

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

const intlMessage = { id: 'intl-message', defaultMessage: 'Hello' };

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when type is error">
        <ContentNotification type="error">A Notification</ContentNotification>
      </VisualSpec>
      <VisualSpec label="when type is info">
        <ContentNotification type="info">A Notification</ContentNotification>
      </VisualSpec>
      <VisualSpec label="when type is warning">
        <ContentNotification type="warning">A Notification</ContentNotification>
      </VisualSpec>
      <VisualSpec label="when type is success">
        <ContentNotification type="success">A Notification</ContentNotification>
      </VisualSpec>
      <VisualSpec label="intlMessage">
        <ContentNotification type="success" intlMessage={intlMessage} />
      </VisualSpec>
      <VisualSpec label="onRemove">
        <ContentNotification type="error" onRemove={() => false}>
          A Notification
        </ContentNotification>
      </VisualSpec>
    </>
  ),
};
