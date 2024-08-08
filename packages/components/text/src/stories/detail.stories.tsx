import type { Meta, StoryFn } from '@storybook/react';
import { WrapProxy } from './../text.proxies';

const meta: Meta<typeof WrapProxy> = {
  title: 'Text & Media/Text/Text.Wrap',
  component: WrapProxy,
};
export default meta;

type Story = StoryFn<typeof WrapProxy>;

/** Wraps the given text in its container. And for long text, text will be wrapped to new line. */
export const BasicExample: Story = (args) => {
  return (
    <div style={{ width: 256 }}>
      <WrapProxy {...args} />
    </div>
  );
};

BasicExample.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
