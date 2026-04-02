import type { ComponentProps } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import Card from './card';
import { UIKitProvider } from '@commercetools-uikit/ui-kit-provider';

// no-op navigate for storybook
const storyRouter = { navigate: () => {} };

type CardProps = ComponentProps<typeof Card>;

const meta: Meta<CardProps> = {
  title: 'components/Card',
  component: Card,
  argTypes: {
    to: {
      control: 'text',
    },
  },
};

export default meta;

export const BasicExample: StoryFn<CardProps> = (args) => {
  return (
    <UIKitProvider router={storyRouter}>
      <Card {...args} />
    </UIKitProvider>
  );
};

BasicExample.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  onClick: undefined,
};
