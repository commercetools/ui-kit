import type { Meta, StoryObj } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import Stamp from './stamp';

const meta: Meta<typeof Stamp> = {
  title: 'components/Stamp',
  component: Stamp,
  argTypes: {
    icon: iconArgType,
  },
};

export default meta;

type Story = StoryObj<typeof Stamp>;

/** Stamps are visual labels which hold small amounts of information regarding an item.
 * (E.g Indicating if a product is published in a list). */
export const BasicExample: Story = {
  args: {
    label: 'Hello, world!',
    // @ts-ignore
    icon: 'WorldIcon',
  },
};
