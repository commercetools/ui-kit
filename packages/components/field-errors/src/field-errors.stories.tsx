import type { Meta, StoryObj } from '@storybook/react';
import FieldErrors from './field-errors';

const meta: Meta<typeof FieldErrors> = {
  title: 'Form/Fields/Field___/FieldErrors',
  component: FieldErrors,
};
export default meta;

type Story = StoryObj<typeof FieldErrors>;

export const BasicExample: Story = {
  args: {
    id: 'error-id',
    errors: {
      missing: true,
      duplicate: true,
      minLength: true,
    },
    renderError: (key) => {
      switch (key) {
        case 'duplicate':
          return 'This is already in use. It must be unique.';
        default:
          // When null is returned then the default error handling from
          // renderDefaultError will kick in for that error.
          return null;
      }
    },

    renderDefaultError: (key) => {
      switch (key) {
        case 'minLength':
          return 'This is too short.';
        default:
          // When null is returned then the error handling defined in
          // FieldError itself will kick in
          return null;
      }
    },
    isVisible: true,
  },
};
