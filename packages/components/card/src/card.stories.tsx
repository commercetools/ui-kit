import type { Meta, StoryObj } from '@storybook/react';
import Constraints from '@commercetools-uikit/constraints';

import Card from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  decorators: [
    (Story) => (
      <Constraints.Horizontal max={10}>
        <Story />
      </Constraints.Horizontal>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'raised',
    insetScale: 'm',
    theme: 'light',
  },
};

export const Flat: Story = {
  args: {
    ...Default.args,
    type: 'flat',
  },
};

export const WithBigPadding: Story = {
  args: {
    ...Default.args,
    insetScale: 'xl',
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
};
