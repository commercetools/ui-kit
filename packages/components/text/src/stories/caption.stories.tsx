import type { Meta, StoryObj } from '@storybook/react';
import { CaptionProxy } from './../text.proxies';

const meta: Meta<typeof CaptionProxy> = {
  title: 'Text & Media/Text/Text.Caption',
  component: CaptionProxy,
};
export default meta;

type Story = StoryObj<typeof CaptionProxy>;

/** Wraps the text in the smallest available font size and accepts `tone` and `fontWeight` props. */
export const BasicExample: Story = {
  args: {
    children: 'Hello Caption!',
  },
};
