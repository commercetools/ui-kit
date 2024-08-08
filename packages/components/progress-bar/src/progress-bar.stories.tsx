import type { Meta, StoryFn } from '@storybook/react';
import ProgressBar, { TProgressBarProps } from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof ProgressBar>;

const Template: Story = (args: TProgressBarProps) => {
  const backgroundColor = args.isInverted ? 'black' : 'transparent';
  return (
    <div style={{ backgroundColor, padding: '2em' }}>
      <ProgressBar {...args} />
    </div>
  );
};

/** `<ProgressBar/>` only without any status label. */
export const BasicExample = Template.bind({});

BasicExample.args = {
  progress: 50,
};

/** `<ProgressBar/>` with status label. */
export const WithStatusLabel = Template.bind({});

WithStatusLabel.args = {
  progress: 33,
  label: '33% complete',
};
