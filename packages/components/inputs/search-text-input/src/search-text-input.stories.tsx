import type { Meta, StoryObj } from '@storybook/react';
import SearchTextInput from './search-text-input';

const meta: Meta<typeof SearchTextInput> = {
  title: 'form/SearchTextInput',
  // @ts-ignore, sb seems unable to deal with this complex type (forwardedRef & partial)
  component: SearchTextInput,
};
export default meta;

type Story = StoryObj<typeof SearchTextInput>;

export const BasicExample: Story = {
  args: {
    // @ts-ignore
    placeholder: 'Placeholder text',
  },
};
