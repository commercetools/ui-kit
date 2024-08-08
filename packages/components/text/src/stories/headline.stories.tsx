import type { Meta, StoryObj } from '@storybook/react';
import { HeadlineProxy } from './../text.proxies';

const meta: Meta<typeof HeadlineProxy> = {
  title: 'Text & Media/Text/Text.Headline',
  component: HeadlineProxy,
};
export default meta;

type Story = StoryObj<typeof HeadlineProxy>;

/** Wraps the given text in the given (via `as`-property) HTML header tag. */
export const BasicExample: Story = {
  args: {
    as: 'h1',
    children: 'Hello Headline!',
  },
};
