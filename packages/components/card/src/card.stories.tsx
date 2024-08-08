import type { ComponentProps } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import Card from './card';
import { BrowserRouter as Router } from 'react-router-dom';

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
    <Router>
      <Card {...args} />
    </Router>
  );
};

BasicExample.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  onClick: undefined,
};
