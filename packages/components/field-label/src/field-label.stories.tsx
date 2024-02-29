import type { Meta, StoryObj } from '@storybook/react';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import * as icons from '@commercetools-uikit/icons';
import { iconArgType } from '@/storybook-helpers';

import FieldLabel from './field-label';

const meta = {
  title: 'Components/FieldLabel',
  component: FieldLabel,
  tags: ['autodocs'],
  args: {
    horizontalConstraint: 'scale',
  },
  argTypes: {
    hintIcon: iconArgType,
  },
} satisfies Meta<typeof FieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sort Order',
    hint: 'Enter a number between 0 and 1',
    description: 'This order will be used to sort the categories.',
  },
};

export const WithRequiredIndicator: Story = {
  args: {
    ...Default.args,
    hasRequiredIndicator: true,
  },
};

export const WithShowBadge: Story = {
  decorators: [
    (Story) => (
      <Constraints.Horizontal max={10}>
        <div style={{ border: '1px solid blue' }}>
          <Story />
        </div>
      </Constraints.Horizontal>
    ),
  ],
  args: {
    ...Default.args,
    badge: (
      <FlatButton
        tone="primary"
        icon={<icons.BoxIcon />}
        label="show"
        onClick={() => {}}
      />
    ),
    horizontalConstraint: 10,
  },
};
