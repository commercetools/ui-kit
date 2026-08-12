import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingSpinner from './loading-spinner';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'components/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    children: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const BasicExample: Story = {
  args: {
    scale: 'l',
    children: 'Loading text...',
  },
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label={'with scale "l", maxDelayDuration "1000" (default)'}>
        <LoadingSpinner />
      </VisualSpec>
      <VisualSpec label={'with scale "s"'}>
        <LoadingSpinner scale="s" />
      </VisualSpec>
      <VisualSpec label="with children">
        <LoadingSpinner>Loading..</LoadingSpinner>
      </VisualSpec>
      <VisualSpec label={'with scale "s" and children'}>
        <LoadingSpinner scale="s">Loading..</LoadingSpinner>
      </VisualSpec>
      <VisualSpec label={'with scale "l" and children'}>
        <LoadingSpinner scale="l">Loading..</LoadingSpinner>
      </VisualSpec>
    </>
  ),
};
