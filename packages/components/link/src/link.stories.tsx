import type { Meta, StoryObj } from '@storybook/react';
import { UIKitProvider } from '@commercetools-uikit/ui-kit-provider';
import Link from './link';

// no-op navigate for storybook
const storyRouter = { navigate: () => {} };

const meta: Meta<typeof Link> = {
  title: 'components/Link',
  component: Link,
};
export default meta;

type Story = StoryObj<typeof Link>;

export const BasicExample: Story = {
  decorators: [
    (Story) => (
      <UIKitProvider router={storyRouter}>
        <Story />
      </UIKitProvider>
    ),
  ],
  args: {
    children: 'Sample Link',
    to: '/path/to/link/to',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'External Text',
    to: '/path/to/link/to',
    isExternal: true,
  },

  decorators: [
    (Story) => (
      <UIKitProvider router={storyRouter}>
        <Story />
      </UIKitProvider>
    ),
  ],
};
