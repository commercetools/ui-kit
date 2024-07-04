import type { Meta, StoryObj } from '@storybook/react';
import Grid from './grid';

const meta: Meta<typeof Grid> = {
  title: 'obsolete/example/Grid',
  component: Grid,
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const BasicExample: Story = {};
