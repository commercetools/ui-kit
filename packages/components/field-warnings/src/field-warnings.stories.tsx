import type { Meta, StoryObj } from '@storybook/react';
import FieldWarnings from './field-warnings';

const meta: Meta<typeof FieldWarnings> = {
  title: 'field/Field__/FieldWarnings',
  component: FieldWarnings,
};
export default meta;

type Story = StoryObj<typeof FieldWarnings>;

export const BasicExample: Story = {
  args: {
    id: 'warning-id',
    warnings: {
      customWarning: true,
      defaultWarning: true,
    },
    renderWarning: (key) => {
      return key === 'customWarning'
        ? 'The current password is weak, You may want to use a stronger password'
        : null;
    },
    renderDefaultWarning: (key /*, warning*/) => {
      return key === 'defaultWarning' ? 'Always use a strong password' : null;
    },
    isVisible: true,
  },
};
