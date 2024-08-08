import type { Meta, StoryObj } from '@storybook/react';
import { SubheadlineProxy } from './../text.proxies';

const meta: Meta<typeof SubheadlineProxy> = {
  title: 'Text & Media/Text/Text.Subheadline',
  component: SubheadlineProxy,
};
export default meta;

type Story = StoryObj<typeof SubheadlineProxy>;

/** Wraps the given text in the given (via `as`-property) HTML header tag. */
export const BasicExample: Story = {
  args: {
    as: 'h4',
    children: 'Hello Subheadline!',
  },
};
