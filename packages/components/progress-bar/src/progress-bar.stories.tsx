import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import ProgressBar, { TProgressBarProps } from './progress-bar';
import { VisualSpec } from '@/storybook-helpers';

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

const InvertedContainer = styled.div`
  background-color: black;
  height: 100px;
`;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when label is a string">
        <ProgressBar label={`${50}% completed`} progress={50} />
      </VisualSpec>
      <VisualSpec label="when height is 10">
        <ProgressBar label={`${25}% completed`} progress={25} height="10" />
      </VisualSpec>
      <VisualSpec label="when bar width is scale">
        <ProgressBar
          label={`${25}% completed`}
          progress={25}
          height="10"
          barWidth={'scale'}
        />
      </VisualSpec>
      <VisualSpec label="when isAnimated is false">
        <ProgressBar
          label={`${50}% completed`}
          progress={50}
          isAnimated={false}
        />
      </VisualSpec>
      <VisualSpec label="when label position is bottom">
        <ProgressBar
          labelPosition="bottom"
          label={`${50}% completed`}
          progress={50}
        />
      </VisualSpec>
      <VisualSpec label="when label position is left">
        <ProgressBar
          labelPosition="left"
          label={`${25}% completed`}
          progress={25}
        />
      </VisualSpec>
      <VisualSpec label="when label position is right">
        <ProgressBar
          labelPosition="right"
          label={`${60}% completed`}
          progress={60}
        />
      </VisualSpec>
      <VisualSpec label="when label position is left and labelWidth is 4">
        <ProgressBar
          labelPosition="left"
          label={`${25}% completed`}
          progress={25}
          /* labelWidth's union starts at 6, but this state is 4 and the label
             names it. Constraints.Horizontal resolves constraint4 fine. */
          labelWidth={4 as TProgressBarProps['labelWidth']}
        />
      </VisualSpec>
      <VisualSpec label="when label position is right and bar width is 4">
        <ProgressBar
          labelPosition="right"
          label={`${50}% completed`}
          progress={50}
          barWidth={4}
        />
      </VisualSpec>
      <VisualSpec label="when label position is right and label is long">
        <ProgressBar
          labelPosition="right"
          label={`super long label title that exceeds the width of the constraint`}
          labelWidth={6}
          progress={50}
        />
      </VisualSpec>
      <VisualSpec label="when label position is left and label is long">
        <ProgressBar
          labelPosition="left"
          label={`super long label title that exceeds the width of the constraint`}
          progress={50}
          labelWidth={6}
          barWidth={4}
        />
      </VisualSpec>
      <VisualSpec label="when label is long">
        <ProgressBar
          label={`super long label title that exceeds the width of the constraint`}
          progress={50}
          labelWidth={6}
          barWidth={4}
        />
      </VisualSpec>
      <VisualSpec label="when label is long and label position is bottom">
        <ProgressBar
          labelPosition="bottom"
          label={`super long label title that exceeds the width of the constraint`}
          progress={50}
          labelWidth={6}
          barWidth={6}
        />
      </VisualSpec>
      <VisualSpec label="when inverted">
        <InvertedContainer>
          <ProgressBar label={`${75}% completed`} progress={75} isInverted />
        </InvertedContainer>
      </VisualSpec>
      <VisualSpec label="when inverted and label is left">
        <InvertedContainer>
          <ProgressBar
            labelPosition="left"
            label={`${75}% completed`}
            progress={75}
            isInverted
          />
        </InvertedContainer>
      </VisualSpec>
      <VisualSpec label="when inverted and label is right">
        <InvertedContainer>
          <ProgressBar
            labelPosition="right"
            label={`${75}% completed`}
            progress={75}
            isInverted
          />
        </InvertedContainer>
      </VisualSpec>
      <VisualSpec label="when inverted and label is bottom">
        <InvertedContainer>
          <ProgressBar
            labelPosition="bottom"
            label={`${75}% completed`}
            progress={75}
            isInverted
          />
        </InvertedContainer>
      </VisualSpec>
    </>
  ),
};
