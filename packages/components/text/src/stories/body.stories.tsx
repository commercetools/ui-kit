import type { Meta, StoryObj } from '@storybook/react';
import { BodyProxy } from './../text.proxies';

const meta: Meta<typeof BodyProxy> = {
  title: 'Text & Media/Text/Text.Body',
  component: BodyProxy,
};
export default meta;

type Story = StoryObj<typeof BodyProxy>;

/** `<Text.Body/>` wraps your text with a `<p>` tag by default. It is used for displaying regular (lengthy) text-content. */
export const BasicExample: Story = {
  args: {
    children: 'Hello World!',
  },
};
