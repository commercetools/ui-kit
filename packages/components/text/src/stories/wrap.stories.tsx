import type { Meta, StoryFn } from '@storybook/react';
import { DetailProxy } from './../text.proxies';

const meta: Meta<typeof DetailProxy> = {
  title: 'Text & Media/Text/Text.Detail',
  component: DetailProxy,
};
export default meta;

type Story = StoryFn<typeof DetailProxy>;

/** Wraps the given text in a `<small>` semantic tag. It accepts a tone prop to properly style the text. */
export const BasicExample: Story = (args) => {
  return <DetailProxy {...args} />;
};

BasicExample.args = {
  children: 'Hello Detail!',
};
