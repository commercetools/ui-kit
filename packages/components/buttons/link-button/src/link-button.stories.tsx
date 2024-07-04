import type { Meta, StoryObj } from '@storybook/react';
import LinkButton from './link-button';

const meta: Meta<typeof LinkButton> = {
  title: 'obsolete/LinkButton',
  component: LinkButton,
};
export default meta;

type Story = StoryObj<typeof LinkButton>;

export const BasicExample: Story = {};
