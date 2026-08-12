import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from './label';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof Label> = {
  title: 'Form/Inputs/Label',
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const BasicExample: Story = {
  args: {
    children: 'Label value',
  },
};

const intlMessage = { id: 'input-label', defaultMessage: 'Hello' };

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <Label>Hello</Label>
      </VisualSpec>
      <VisualSpec label="when fontWeight medium">
        <Label fontWeight="medium">Hello</Label>
      </VisualSpec>
      <VisualSpec label="when fontWeight bold">
        <Label fontWeight="bold">Hello</Label>
      </VisualSpec>
      <VisualSpec label="with required indicator">
        <Label isRequiredIndicatorVisible={true}>Hello</Label>
      </VisualSpec>
      <VisualSpec label="intlMessage">
        <Label intlMessage={intlMessage} />
      </VisualSpec>
    </>
  ),
};
